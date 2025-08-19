import cicd from '@6edesign/cicd';
import { EnvSecretProvider } from './envSecretProvider';
import { LocalWorkspace, PulumiFn, Stack } from '@pulumi/pulumi/automation/index.js';
import * as path from 'path';
import * as fs from 'fs/promises';

// By importing the default cicd engine, we can infer all the types we need.
type CicdEngine = typeof cicd;
type AllPlugins = CicdEngine['plugins'];
type DeployablePlugin = AllPlugins[keyof AllPlugins];

// Manually define the Deployable type based on the known base properties
// of a deployable configuration object.
type Deployable = ReturnType<CicdEngine['createDeployable']>;

export class DeploymentService {
	private secretProvider: EnvSecretProvider;

	constructor() {
		this.secretProvider = new EnvSecretProvider();
	}

	private topologicalSort(deployables: Deployable[]): Deployable[] {
		const graph: Map<string, string[]> = new Map();
		const inDegree: Map<string, number> = new Map();
		const result: Deployable[] = [];

		for (const deployable of deployables) {
			graph.set(deployable.name, []);
			inDegree.set(deployable.name, 0);
		}

		for (const deployable of deployables) {
			if (deployable.dependencies) {
				for (const dep of deployable.dependencies) {
					if (!graph.has(dep)) {
						throw new Error(`Undeclared dependency: ${dep} for deployable ${deployable.name}`);
					}
					graph.get(dep)!.push(deployable.name);
					inDegree.set(deployable.name, (inDegree.get(deployable.name) || 0) + 1);
				}
			}
		}

		const queue: string[] = [];
		for (const [name, degree] of inDegree.entries()) {
			if (degree === 0) {
				queue.push(name);
			}
		}

		while (queue.length > 0) {
			const current = queue.shift()!;
			const deployable = deployables.find((d) => d.name === current);
			if (deployable) {
				result.push(deployable);
			}

			for (const neighbor of graph.get(current) || []) {
				inDegree.set(neighbor, (inDegree.get(neighbor) || 0) - 1);
				if (inDegree.get(neighbor) === 0) {
					queue.push(neighbor);
				}
			}
		}

		if (result.length !== deployables.length) {
			throw new Error('Circular dependency detected or some deployables are not reachable.');
		}

		return result;
	}

	private async setupPulumiBackend(): Promise<void> {
		if (!process.env.PULUMI_BACKEND_URL) {
			const workDir = process.cwd();
			const localStateDir = path.join(workDir, '.pulumi');
			// Ensure the directory exists without checking first, `recursive: true` handles this.
			await fs.mkdir(localStateDir, { recursive: true });
			process.env.PULUMI_BACKEND_URL = `file://${localStateDir}`;
			console.log(
				`PULUMI_BACKEND_URL not set, using local filesystem backend at: ${process.env.PULUMI_BACKEND_URL}`
			);
			console.log(
				`PULUMI_CONFIG_PASSPHRASE: ${process.env.PULUMI_CONFIG_PASSPHRASE ? 'Set' : 'Not Set'}`
			);
		} else {
			console.log(`Using configured backend: ${process.env.PULUMI_BACKEND_URL}`);
		}
	}
	ge;

	private async installPlugins(stack: Stack): Promise<void> {
		console.log('Installing plugins...');
		// TODO: Make plugin installation dynamic based on deployable requirements
		await stack.workspace.installPlugin('docker', 'v4.8.0');
		await stack.workspace.installPlugin('docker-build', 'v0.0.12');
		console.log('Plugins installed.');
	}

	private async runPulumi(stack: Stack, dryRun: boolean): Promise<void> {
		if (dryRun) {
			console.log('Running Pulumi preview...');
			await stack.preview({
				onOutput: console.info,
				onEvent: (event) => console.log('Pulumi event:', JSON.stringify(event, null, 2))
			});
		} else {
			console.log('Running Pulumi up...');
			const upRes = await stack.up({
				onOutput: console.info,
				onEvent: (event) => console.log('Pulumi event:', JSON.stringify(event, null, 2))
			});
			console.log(`Update summary: ${upRes.summary.message}`);
			console.log(upRes.stdout);
			console.log('Full update result:', JSON.stringify(upRes, null, 2));
		}
	}

	private getDeployables(
		cicdConfig: { deployables: Deployable[] },
		deployableName?: string
	): Deployable[] {
		if (deployableName) {
			const targetDeployable = cicdConfig.deployables.find((d) => d.name === deployableName);
			if (!targetDeployable) {
				throw new Error(`Deployable '${deployableName}' not found in configuration.`);
			}
			return [targetDeployable];
		}
		return this.topologicalSort(cicdConfig.deployables);
	}

	private async checkSecrets(plugin: DeployablePlugin, deployableName: string): Promise<void> {
		if (plugin.requiredSecrets) {
			for (const secretName of plugin.requiredSecrets) {
				try {
					await this.secretProvider.getSecret(secretName);
				} catch (error) {
					console.error(
						`Missing required secret '${secretName}' for deployable '${deployableName}'.`
					);
					throw error;
				}
			}
		}
	}

	public async execute(
		cicd: CicdEngine,
		cicdConfig: { deployables: Deployable[] },
		deployableName: string | undefined,
		workspaceName: string,
		options: { dryRun: boolean; environment: string; version?: string; debug?: boolean }
	): Promise<void> {
		const deployablesToExecute = this.getDeployables(cicdConfig, deployableName);

		await this.setupPulumiBackend();

		for (const deployable of deployablesToExecute) {
			const plugin = cicd.plugins[deployable.__pluginType as keyof AllPlugins];

			if (!plugin || !plugin.deployHandler) {
				throw new Error(`No deployHandler found for plugin type: ${deployable.__pluginType}`);
			}

			await this.checkSecrets(plugin, deployable.name);

			const pulumiProgram: PulumiFn = async () => {
				const context = {
					dryRun: options.dryRun,
					secretProvider: this.secretProvider,
					version: options.version,
					workspaceName: workspaceName
				};
				console.log(`pulumiProgram`, context);
				return plugin.deployHandler(deployable, context);
			};

      console.log('Inspecting CICD engine in DeploymentService:', cicd);
			if (!cicd.pulumi) {
				throw new Error('Pulumi configuration is missing in the CICD engine.');
			}

			const stackName = cicd.pulumi.environments[options.environment];
			if (!stackName) {
				throw new Error(`Environment '${options.environment}' not found in Pulumi configuration.`);
			}

			const stack = await LocalWorkspace.createOrSelectStack(
				{
					stackName,
					projectName: cicd.pulumi.project,
					program: pulumiProgram
				},
				{
					workDir: process.cwd(),
					envVars: {
						PULUMI_LOG_LEVEL: 'debug',
						PULUMI_DEBUG_COMMANDS: 'true',
						BUILDKIT_PROGRESS: 'plain',
						DOCKER_BUILDX_PROGRESS: 'plain',
						DOCKER_CLI_EXPERIMENTAL: 'enabled'
					}
				}
			);

			console.log(`Successfully initialized stack '${stack.name}' with workdir ${process.cwd()}`);

			await this.installPlugins(stack);
			await this.runPulumi(stack, options.dryRun);
		}
	}

	public async executeAll(
		cicd: CicdEngine,
		cicdConfig: { deployables: Deployable[] },
		workspaceName: string,
		options: { dryRun: boolean; environment: string; version?: string; debug?: boolean }
	): Promise<void> {
		const deployablesToExecute = this.topologicalSort(cicdConfig.deployables);

		for (const deployable of deployablesToExecute) {
			await this.execute(cicd, cicdConfig, deployable.name, workspaceName, options);
		}
	}
}
