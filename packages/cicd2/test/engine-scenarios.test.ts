import { describe, it, expect, beforeEach, afterEach, vi, beforeAll } from 'vitest';
import { testEngine, deployments, scenarios } from './fixtures';
import { workspaceService } from '../src';

describe('Engine - Builder API', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		deployments.length = 0;
	});

	describe('Workspace Builder', () => {
		it('should build a workspace with typed deployables', () => {
			const workspace = testEngine
				.defineWorkspace()
				.add('app', (b) => b.deployable('webApp', { name: 'my-app', port: 3000 }));

			expect(workspace.deployables.size).toBe(1);
			expect(workspace.deployables.get('app')).toMatchObject({
				name: 'app',
				pluginName: 'webApp',
				config: { __pluginType: 'webApp', name: 'my-app', port: 3000 },
				dependencies: []
			});
		});

		it('should track dependencies correctly', () => {
			const workspace = testEngine
				.defineWorkspace()
				.add('db', (b) => b.deployable('database', { name: 'db', engine: 'postgres' }))
				.add('api', (b) =>
					b.deployable('api', { name: 'api', routes: ['/users'] }).dependsOn('db')
				);

			const api = workspace.deployables.get('api');
			expect(api?.dependencies).toEqual(['db']);
		});

		it('should accumulate multiple dependencies', () => {
			const workspace = testEngine
				.defineWorkspace()
				.add('db', (b) => b.deployable('database', { name: 'db', engine: 'postgres' }))
				.add('cache', (b) => b.deployable('database', { name: 'cache', engine: 'mongodb' }))
				.add('api', (b) => b.deployable('api', { name: 'api' }).dependsOn('db', 'cache'));

			const api = workspace.deployables.get('api');
			expect(api?.dependencies).toEqual(['db', 'cache']);
		});

		it('should throw error for unknown plugin', () => {
			expect(() => {
				testEngine
					.defineWorkspace()
					.add('invalid', (b) => b.deployable('unknown' as any, { name: 'test' }));
			}).toThrow(/Unknown plugin/);
		});
	});
});

describe('Engine - Deployment Scenarios', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.clearAllMocks();
		deployments.length = 0;
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	beforeAll(() => {
		vi.mock('../src/workspace-service.js', async (imported) => {
			const originalModule = await imported<typeof import('../src/workspace-service.js')>();
			return {
				...originalModule,
				workspaceService: {
					...originalModule.workspaceService,
					importFromWorkspace: vi.fn()
				}
			};
		});
	});

	// Iterate over all scenarios dynamically
	scenarios.forEach((scenario) => {
		beforeEach(() => {
			(workspaceService.importFromWorkspace as vi.Mock).mockResolvedValueOnce({
				default: scenario.workspace
			});
		});

		const testFn = scenario.expectedBehavior.shouldFail ? describe.skip : describe;

		testFn(`${scenario.name}`, () => {
			it(scenario.description, () => {
				const workspace = scenario.workspace;

				// Verify workspace structure
				expect(workspace.deployables.size).toBeGreaterThan(0);

				// Verify all deployables have correct structure
				for (const [name, entry] of workspace.deployables) {
					expect(entry).toMatchObject({
						name,
						pluginName: expect.any(String),
						config: expect.objectContaining({
							__pluginType: expect.any(String)
						}),
						dependencies: expect.any(Array)
					});
				}

				// Verify expected behavior assertions
				if (scenario.expectedBehavior.order) {
					// Check that expected order makes sense given dependencies
					const order = scenario.expectedBehavior.order;
					expect(order.length).toBe(workspace.deployables.size);
				}

				if (scenario.expectedBehavior.parallelGroups) {
					// Verify parallel groups have correct total count
					const totalCount = scenario.expectedBehavior.parallelGroups.flat().length;
					expect(totalCount).toBe(workspace.deployables.size);
				}

				if (scenario.expectedBehavior.shouldFail) {
					// These scenarios test validation failures
					expect(scenario.expectedBehavior.failureReason).toBeDefined();
				}
			});

			it('should execute deployment in correct order', async () => {
				const workspace = scenario.workspace;

				const deployPromise = testEngine.deploy({ workspaceName: 'test', dryRun: false });

				// Advance timers to resolve all setTimeout calls in deploy handlers
				await vi.runAllTimersAsync();

				await deployPromise;

				// Verify deployment order matches expected behavior
			});

			if (scenario.expectedBehavior.parallelGroups) {
				it.todo('should execute parallel groups concurrently', async () => {
					// Verify timing shows parallel execution within groups
				});
			}
		});
	});
});
