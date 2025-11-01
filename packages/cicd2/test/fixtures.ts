import { createPlugin, Engine, createSecretProvider, z } from '../src/engine';
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
		await new Promise((resolve) => setTimeout(resolve, 3000));
		return { deployed: true, type, name: config.name };
	});

// Simple web app plugin
export const webAppPlugin = createPlugin({
	input: z.object({
		name: z.string(),
		port: z.number().optional()
	}),
	deployHandler: createDeployHandler('webApp')
});

// Database plugin
export const databasePlugin = createPlugin({
	input: z.object({
		name: z.string(),
		engine: z.enum(['postgres', 'mysql', 'mongodb'])
	}),
	deployHandler: createDeployHandler('database')
});

// API service plugin
export const apiPlugin = createPlugin({
	input: z.object({
		name: z.string(),
		routes: z.array(z.string()).optional()
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

testEngine.defineWorkspaceConfig({
	deployables: {
		database: {
			config: testEngine.defineDeployableConfig('database', { name: 'db1', engine: 'mongodb' })
		},
		webapp: {
			config: testEngine.defineDeployableConfig('webApp', { name: 'my-web-app', port: 3008 }),
			dependsOn: ['foo']
		}
	}
});

/**
 * Test Scenarios - demonstrates library usage patterns
 */
export const scenarios = [
	{
		name: 'Single Deployable',
		description: 'One deployable with no dependencies',
		workspace: testEngine.defineWorkspaceConfig({
			deployables: [testEngine.createDeployable('webApp', { name: 'simple-app', port: 3000 })]
		}),
		expectedBehavior: {
			order: ['simple-app']
		}
	},

	{
		name: 'Independent Deployables',
		description: 'Multiple deployables with no dependencies - can deploy in parallel',
		workspace: testEngine.defineWorkspaceConfig({
			deployables: [
				testEngine.createDeployable('webApp', { name: 'app-1', port: 3001 }),
				testEngine.createDeployable('webApp', { name: 'app-2', port: 3002 }),
				testEngine.createDeployable('database', { name: 'db-1', engine: 'postgres' })
			]
		}),
		expectedBehavior: {
			parallelGroups: [['app-1', 'app-2', 'db-1']]
		}
	},

	{
		name: 'Linear Chain',
		description: `Three deployables in a linear dependency chain
    web
     └── api
          └── db`,
		workspace: testEngine.defineWorkspaceConfig({
			deployables: [testEngine.createDeployable('webApp', { name: 'web', port: 3000 })],
			dependencies: [
				testEngine.defineWorkspaceConfig({
					deployables: [
						testEngine.createDeployable('api', { name: 'api', routes: ['/users', '/posts'] })
					],
					dependencies: [
						testEngine.defineWorkspaceConfig({
							deployables: [
								testEngine.createDeployable('database', { name: 'db', engine: 'postgres' })
							]
						})
					]
				})
			]
		}),
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
          └── db`,
		workspace: testEngine.defineWorkspaceConfig({
			deployables: [testEngine.createDeployable('webApp', { name: 'web', port: 3000 })],
			dependencies: [
				testEngine.defineWorkspaceConfig({
					deployables: [testEngine.createDeployable('api', { name: 'api', routes: ['/data'] })],
					dependencies: [
						testEngine.defineWorkspaceConfig({
							deployables: [
								testEngine.createDeployable('database', { name: 'db', engine: 'postgres' })
							]
						})
					]
				}),
				testEngine.defineWorkspaceConfig({
					deployables: [
						testEngine.createDeployable('database', { name: 'cache', engine: 'mongodb' })
					],
					dependencies: [
						testEngine.defineWorkspaceConfig({
							deployables: [
								testEngine.createDeployable('database', { name: 'db', engine: 'postgres' })
							]
						})
					]
				})
			]
		}),
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
          └── db1           └── db2`,
		workspace: testEngine.defineWorkspaceConfig({
			deployables: [
				testEngine.createDeployable('webApp', { name: 'web1', port: 3000 }),
				testEngine.createDeployable('webApp', { name: 'web2', port: 4000 })
			],
			dependencies: [
				testEngine.defineWorkspaceConfig({
					deployables: [testEngine.createDeployable('api', { name: 'api1', routes: ['/users'] })],
					dependencies: [
						testEngine.defineWorkspaceConfig({
							deployables: [
								testEngine.createDeployable('database', { name: 'db1', engine: 'postgres' })
							]
						})
					]
				}),
				testEngine.defineWorkspaceConfig({
					deployables: [
						testEngine.createDeployable('api', { name: 'api2', routes: ['/products'] })
					],
					dependencies: [
						testEngine.defineWorkspaceConfig({
							deployables: [
								testEngine.createDeployable('database', { name: 'db2', engine: 'mysql' })
							]
						})
					]
				})
			]
		}),
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
          └── db`,
		workspace: testEngine.defineWorkspaceConfig({
			deployables: [testEngine.createDeployable('webApp', { name: 'web', port: 3000 })],
			dependencies: [
				testEngine.defineWorkspaceConfig({
					deployables: [testEngine.createDeployable('api', { name: 'api1', routes: ['/users'] })],
					dependencies: [
						testEngine.defineWorkspaceConfig({
							deployables: [
								testEngine.createDeployable('database', { name: 'db', engine: 'postgres' })
							]
						})
					]
				}),
				testEngine.defineWorkspaceConfig({
					deployables: [testEngine.createDeployable('api', { name: 'api2', routes: ['/posts'] })],
					dependencies: [
						testEngine.defineWorkspaceConfig({
							deployables: [
								testEngine.createDeployable('database', { name: 'db', engine: 'postgres' })
							]
						})
					]
				}),
				testEngine.defineWorkspaceConfig({
					deployables: [
						testEngine.createDeployable('api', { name: 'api3', routes: ['/comments'] })
					],
					dependencies: [
						testEngine.defineWorkspaceConfig({
							deployables: [
								testEngine.createDeployable('database', { name: 'db', engine: 'postgres' })
							]
						})
					]
				})
			]
		}),
		expectedBehavior: {
			parallelGroups: [['db'], ['api1', 'api2', 'api3'], ['web']]
		}
	},

	{
		name: 'Circular Dependency',
		description: `Circular dependency chain - should fail validation
    web
     └── api
          └── cache
               └── web (circular!)`,
		workspace: testEngine.defineWorkspaceConfig({
			deployables: [testEngine.createDeployable('webApp', { name: 'web', port: 3000 })],
			dependencies: [
				testEngine.defineWorkspaceConfig({
					deployables: [testEngine.createDeployable('api', { name: 'api', routes: ['/data'] })],
					dependencies: [
						testEngine.defineWorkspaceConfig({
							deployables: [
								testEngine.createDeployable('database', { name: 'cache', engine: 'mongodb' })
							],
							dependencies: [
								testEngine.defineWorkspaceConfig({
									deployables: [testEngine.createDeployable('webApp', { name: 'web', port: 3000 })]
								})
							]
						})
					]
				})
			]
		}),
		expectedBehavior: {
			shouldFail: true,
			failureReason: 'Circular dependency detected'
		}
	},

	{
		name: 'Missing Dependency',
		description: `Web depends on API but API is not defined - should fail validation
    web
     └── api (missing!)`,
		workspace: testEngine.defineWorkspaceConfig({
			deployables: [testEngine.createDeployable('webApp', { name: 'web', port: 3000 })],
			dependencies: [
				testEngine.defineWorkspaceConfig({
					deployables: [testEngine.createDeployable('api', { name: 'api', routes: ['/data'] })]
				})
			]
		}),
		expectedBehavior: {
			shouldFail: true,
			failureReason: 'Dependency not found: api'
		}
	}
];
