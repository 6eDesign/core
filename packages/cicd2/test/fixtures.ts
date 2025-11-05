import { createPlugin, Engine, createSecretProvider, z } from '../src/index.js';
import { vi } from 'vitest';

/**
 * Singleton test environment - use vi.clearAllMocks() in beforeEach to reset
 */

// Track all deployments for assertions
export const deployments: Array<{ name: string; type: string; timestamp: number }> = [];

// Create stubbed deploy handler
const createDeployHandler = (type: string) =>
	vi.fn(async (config: any, context: any) => {
		deployments.push({
			name: config.name,
			type,
			timestamp: Date.now()
		});
		await new Promise((resolve) => setTimeout(resolve, 10));
		return { deployed: true, type, name: config.name };
	});

// Simple web app plugin
export const webAppPlugin = createPlugin({
	input: z.object({
		name: z.string(),
		port: z.number().optional()
	}),
	output: z.object({
		deployed: z.boolean(),
		type: z.string(),
		name: z.string()
	}),
	deployHandler: createDeployHandler('webApp')
});

// Database plugin
export const databasePlugin = createPlugin({
	input: z.object({
		name: z.string(),
		engine: z.enum(['postgres', 'mysql', 'mongodb'])
	}),
	output: z.object({
		deployed: z.boolean(),
		type: z.string(),
		name: z.string()
	}),
	deployHandler: createDeployHandler('database')
});

// API service plugin
export const apiPlugin = createPlugin({
	input: z.object({
		name: z.string(),
		routes: z.array(z.string()).optional()
	}),
	output: z.object({
		deployed: z.boolean(),
		type: z.string(),
		name: z.string()
	}),
	deployHandler: createDeployHandler('api')
});

// Singleton test engine
export const testEngine = new Engine({
	plugins: {
		webApp: webAppPlugin,
		database: databasePlugin,
		api: apiPlugin
	},
	secretProvider: createSecretProvider(async (name: string) => `mock-${name}`)
});

/**
 * Test Scenarios - demonstrates library usage patterns
 */
export const scenarios = [
	{
		name: 'Single Deployable',
		description: 'One deployable with no dependencies',
		workspace: testEngine
			.defineWorkspace()
			.add('simple-app', (b) => b.deployable('webApp', { name: 'simple-app', port: 3000 })),
		expectedBehavior: {
			order: ['simple-app']
		}
	},

	{
		name: 'Independent Deployables',
		description: 'Multiple deployables with no dependencies - can deploy in parallel',
		workspace: testEngine
			.defineWorkspace()
			.add('app-1', (b) => b.deployable('webApp', { name: 'app-1', port: 3001 }))
			.add('app-2', (b) => b.deployable('webApp', { name: 'app-2', port: 3002 }))
			.add('db-1', (b) => b.deployable('database', { name: 'db-1', engine: 'postgres' })),
		expectedBehavior: {
			parallelGroups: [['app-1', 'app-2', 'db-1']]
		}
	},

	{
		name: 'Linear Chain',
		description: `Three deployables in a linear dependency chain

      web
       └── api
            └── db
`,
		workspace: testEngine
			.defineWorkspace()
			.add('db', (b) => b.deployable('database', { name: 'db', engine: 'postgres' }))
			.add('api', (b) =>
				b.deployable('api', { name: 'api', routes: ['/users', '/posts'] }).dependsOn('db')
			)
			.add('web', (b) => b.deployable('webApp', { name: 'web', port: 3000 }).dependsOn('api')),
		expectedBehavior: {
			order: ['db', 'api', 'web']
		}
	},

	{
		name: 'Diamond Dependency',
		description: `Web depends on both API and cache, both depend on same database

      web
       ├── api
       │    └── db
       └── cache
            └── db
`,
		workspace: testEngine
			.defineWorkspace()
			.add('db', (b) => b.deployable('database', { name: 'db', engine: 'postgres' }))
			.add('api', (b) => b.deployable('api', { name: 'api', routes: ['/data'] }).dependsOn('db'))
			.add('cache', (b) =>
				b.deployable('database', { name: 'cache', engine: 'mongodb' }).dependsOn('db')
			)
			.add('web', (b) =>
				b.deployable('webApp', { name: 'web', port: 3000 }).dependsOn('api', 'cache')
			),
		expectedBehavior: {
			order: ['db', 'api', 'cache', 'web'],
			parallelGroups: [['db'], ['api', 'cache'], ['web']]
		}
	},

	{
		name: 'Parallel Branches',
		description: `Two independent deployment chains that should run in parallel

      web1              web2
       └── api1          └── api2
            └── db1           └── db2
`,
		workspace: testEngine
			.defineWorkspace()
			.add('db1', (b) => b.deployable('database', { name: 'db1', engine: 'postgres' }))
			.add('db2', (b) => b.deployable('database', { name: 'db2', engine: 'mysql' }))
			.add('api1', (b) =>
				b.deployable('api', { name: 'api1', routes: ['/users'] }).dependsOn('db1')
			)
			.add('api2', (b) =>
				b.deployable('api', { name: 'api2', routes: ['/products'] }).dependsOn('db2')
			)
			.add('web1', (b) => b.deployable('webApp', { name: 'web1', port: 3000 }).dependsOn('api1'))
			.add('web2', (b) => b.deployable('webApp', { name: 'web2', port: 4000 }).dependsOn('api2')),
		expectedBehavior: {
			parallelGroups: [
				['db1', 'db2'],
				['api1', 'api2'],
				['web1', 'web2']
			]
		}
	},

	{
		name: 'Fan-Out',
		description: `One database, multiple APIs depend on it, web depends on all APIs

      web
       ├── api1
       │    └── db
       ├── api2
       │    └── db
       └── api3
            └── db
`,
		workspace: testEngine
			.defineWorkspace()
			.add('db', (b) => b.deployable('database', { name: 'db', engine: 'postgres' }))
			.add('api1', (b) => b.deployable('api', { name: 'api1', routes: ['/users'] }).dependsOn('db'))
			.add('api2', (b) => b.deployable('api', { name: 'api2', routes: ['/posts'] }).dependsOn('db'))
			.add('api3', (b) =>
				b.deployable('api', { name: 'api3', routes: ['/comments'] }).dependsOn('db')
			)
			.add('web', (b) =>
				b.deployable('webApp', { name: 'web', port: 3000 }).dependsOn('api1', 'api2', 'api3')
			),
		expectedBehavior: {
			parallelGroups: [['db'], ['api1', 'api2', 'api3'], ['web']]
		}
	},

	{
		name: 'Circular Dependency',
		description: `Circular dependency chain - type system prevents forward references, but runtime should detect cycles

      cache → web → api → cache (cycle!)
`,
		workspace: testEngine
			.defineWorkspace()
			.add('cache', (b) =>
				b
					.deployable('database', { name: 'cache', engine: 'mongodb' })
					// @ts-expect-error - Intentionally creating forward reference for cycle test
					.dependsOn('api')
			)
			.add('web', (b) => b.deployable('webApp', { name: 'web', port: 3000 }).dependsOn('cache'))
			.add('api', (b) => b.deployable('api', { name: 'api', routes: ['/data'] }).dependsOn('web')),
		expectedBehavior: {
			shouldFail: true,
			failureReason: 'Circular dependency detected'
		}
	},

	{
		name: 'Missing Dependency',
		description: `Web depends on non-existent deployable - type system catches this at compile-time`,
		workspace: testEngine
			.defineWorkspace()
			// @ts-expect-error - Intentionally referencing non-existent deployable for validation test
			.add('web', (b) => b.deployable('webApp', { name: 'web', port: 3000 }).dependsOn('api')),
		expectedBehavior: {
			shouldFail: true,
			failureReason: 'Dependency not found: api'
		}
	}
];
