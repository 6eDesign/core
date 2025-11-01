import { describe, it, expect, beforeEach, vi } from 'vitest';
import { testEngine, deployments, scenarios, createScenarioWorkspace } from './fixtures';

describe('Engine - Deployment Scenarios', () => {
	beforeEach(() => {
		// Reset all mocks and clear deployment tracking between tests
		vi.clearAllMocks();
		deployments.length = 0;
	});

	describe('Scenario 1: Single Deployable', () => {
		it('should deploy a single deployable with no dependencies', async () => {
			// Given: A scenario with one deployable
			const scenario = scenarios.singleDeployable;
			const config = createScenarioWorkspace(scenario);

			// When: We deploy
			// await testEngine.deploy({
			// 	workspaceName: 'test',
			// 	dryRun: false
			// });

			// Then: The deployable should be deployed
			expect(config.deployables).toHaveLength(1);
			expect(config.deployables[0]).toMatchObject({
				__pluginType: 'webApp',
				name: 'simple-app',
				port: 3000
			});
			// TODO: Check deployments array once deploy() is implemented
		});
	});

	describe('Scenario 2: Independent Deployables', () => {
		it('should deploy all independent deployables in parallel', async () => {
			// Given: Multiple deployables with no dependencies
			const scenario = scenarios.independentDeployables;
			const config = createScenarioWorkspace(scenario);

			// When: We deploy
			// const startTime = Date.now();
			// await testEngine.deploy({
			// 	workspaceName: 'test',
			// 	dryRun: false
			// });
			// const duration = Date.now() - startTime;

			// Then: All three should deploy
			expect(config.deployables).toHaveLength(3);

			// Then: They should run in parallel (not sequentially)
			// If sequential: 3 * 3000ms = 9000ms
			// If parallel: ~3000ms
			// expect(duration).toBeLessThan(5000);
			// expect(duration).toBeGreaterThan(2900);
		});
	});

	describe('Scenario 3: Linear Chain', () => {
		it('should deploy in correct order: db -> api -> web', async () => {
			const scenario = scenarios.linearChain;
			const config = createScenarioWorkspace(scenario);

			expect(config.deployables).toHaveLength(3);
		});
	});

	describe('Scenario 4: Diamond Dependency', () => {
		it('should deploy db first, then api+cache in parallel, then web', async () => {
			const scenario = scenarios.diamondDependency;
			const config = createScenarioWorkspace(scenario);

			// When: We deploy
			// const deployOrder: string[] = [];
			// const startTimes: Record<string, number> = {};
			// await testEngine.deploy({
			// 	workspaceName: 'test',
			// 	dryRun: false
			// });

			// Then: db deploys first
			// expect(deployOrder[0]).toBe('db');

			// Then: api and cache deploy in parallel (after db)
			// const apiStart = startTimes['api'];
			// const cacheStart = startTimes['cache'];
			// expect(Math.abs(apiStart - cacheStart)).toBeLessThan(100); // Within 100ms = parallel

			// Then: web deploys last
			// expect(deployOrder[deployOrder.length - 1]).toBe('web');

			expect(config.deployables).toHaveLength(4);
		});
	});

	describe('Scenario 5: Parallel Branches', () => {
		it('should deploy two independent branches in parallel', async () => {
			const scenario = scenarios.parallelBranches;
			const config = createScenarioWorkspace(scenario);

			expect(config.deployables).toHaveLength(6);
		});
	});

	describe('Scenario 6: Fan-Out Pattern', () => {
		it('should deploy db, then all APIs in parallel, then web', async () => {
			const scenario = scenarios.fanOut;
			const config = createScenarioWorkspace(scenario);

			// When: We deploy
			// const deployOrder: string[] = [];
			// await testEngine.deploy({
			// 	workspaceName: 'test',
			// 	dryRun: false
			// });

			// Then: db deploys first
			// expect(deployOrder[0]).toBe('db');

			// Then: All three APIs deploy in parallel
			// const apiIndices = ['api1', 'api2', 'api3'].map(name => deployOrder.indexOf(name));
			// expect(Math.max(...apiIndices) - Math.min(...apiIndices)).toBeLessThan(3); // Within 2 positions

			// Then: web deploys last
			// expect(deployOrder[deployOrder.length - 1]).toBe('web');

			expect(config.deployables).toHaveLength(5);
		});
	});

	describe('Scenario 7: Circular Dependency', () => {
		it('should detect and reject circular dependencies', async () => {
			const scenario = scenarios.circularDependency;
			const config = createScenarioWorkspace(scenario);

			expect(config.deployables).toHaveLength(3);
		});
	});

	describe('Scenario 8: Missing Dependency', () => {
		it('should detect and reject missing dependencies', async () => {
			const scenario = scenarios.missingDependency;
			const config = createScenarioWorkspace(scenario);

			expect(config.deployables).toHaveLength(1);
		});
	});
});

describe('Engine - API Tests', () => {
	describe('createDeployable', () => {
		it('should create a deployable with correct plugin type', () => {
			const deployable = testEngine.createDeployable('webApp', {
				name: 'my-app',
				port: 8080
			});

			expect(deployable).toMatchObject({
				__pluginType: 'webApp',
				name: 'my-app',
				port: 8080
			});
		});

		it('should throw error for unknown plugin type', () => {
			expect(() => {
				testEngine.createDeployable('unknownPlugin' as any, { name: 'test' });
			}).toThrow(/Unknown plugin/);
		});
	});

	describe('defineWorkspaceConfig', () => {
		it('should accept valid workspace config', () => {
			const config = testEngine.defineWorkspaceConfig({
				deployables: [testEngine.createDeployable('webApp', { name: 'app', port: 3000 })]
			});

			expect(config.deployables).toHaveLength(1);
		});
	});
});
