import { z } from 'zod';
import { defineCommand } from '../utils/defineCommand';
import { WorkspaceService } from '../services/workspace.service';
import { ConfigService } from '../services/config.service';
import { DeploymentService } from '../services/deployment.service';
import { graphCommand } from './graph';
import { generateWorkflowMatrixCommand } from './generate-workflow-matrix';
import { workflowWaitOnJobsCommand } from './workflow-wait-on-jobs';

export const deployCommand = defineCommand({
	name: 'deploy',
	description: 'Deploy a workspace deployable',
	inputs: {
		workspace: {
			schema: z.string(),
			description: 'The name of the workspace',
			promptConfig: {
				type: 'autocomplete',
				message: 'Select a workspace:',
				source: async (answersSoFar: any, input: string) => {
					const workspaceService = new WorkspaceService();
					const deployableWorkspaces = await workspaceService.discoverDeployableWorkspaces();
					return deployableWorkspaces.map((w) => ({ name: w.name, value: w.name }));
				}
			}
		},
		deployable: {
			schema: z.string(),
			description: 'The name of the deployable to execute',
			promptConfig: {
				type: 'autocomplete',
				message: 'Select a deployable!!!!!:',
				source: async (options: { workspace: string }) => {
					const workspaceService = new WorkspaceService();
					const workspaces = await workspaceService.discoverWorkspaces();
					const selectedWorkspace = workspaces.find((w) => w.name === options.workspace);
					if (!selectedWorkspace) {
						return [];
					}
					const configService = new ConfigService();
					const { workspaceConfig } = await configService.loadConfig(
						process.cwd(),
						selectedWorkspace.path
					);
					return workspaceConfig.config.deployables.map((d: any) => ({
						name: d.name,
						value: d.name
					}));
				}
			}
		},
		environment: {
			schema: z.string(),
			description: 'The deployment environment (e.g., dev, staging, prod)',
			promptConfig: {
				type: 'list',
				message: 'Select the deployment environment:',
				choices: async () => {
					const configService = new ConfigService();
					const { projectConfig } = await configService.loadConfig(process.cwd(), '');
					return projectConfig.environments;
				}
			}
		},
		version: {
			schema: z.string().optional(),
			description: 'The version to deploy',
			promptConfig: {
				type: 'input',
				message: 'Enter version (optional):'
			}
		},
		dryRun: {
			schema: z.boolean().optional(),
			description: 'Perform a dry run without executing external actions'
		},
		debug: {
			schema: z.boolean().optional(),
			description: 'Enable debug logging'
		}
	},
	handler: async (input) => {
		input;
		const workspaceService = new WorkspaceService();
		const configService = new ConfigService();
		const deploymentService = new DeploymentService();

		const workspaces = await workspaceService.discoverWorkspaces();
		const selectedWorkspace = workspaces.find((w) => w.name === input.workspace);
		if (!selectedWorkspace) {
			console.error(`Workspace '${input.workspace}' not found.`);
			return;
		}

		const { projectConfig, workspaceConfig, engine } = await configService.loadConfig(
			process.cwd(),
			selectedWorkspace.path
		);
		if (
			!workspaceConfig ||
			!workspaceConfig.config ||
			workspaceConfig.config.deployables.length === 0
		) {
			console.error(`No deployables found in '${selectedWorkspace.name}'.`);
			return;
		}

		const cicd = engine.createChildCicdEngine(engine, { pulumiConfig: projectConfig.pulumi });

		if (input.deployable === '*') {
			await deploymentService.executeAll(cicd, workspaceConfig.config, selectedWorkspace.name, {
				dryRun: !!input.dryRun,
				environment: input.environment,
				version: input.version,
				debug: !!input.debug
			});
		} else {
			await deploymentService.execute(
				cicd,
				workspaceConfig.config,
				input.deployable,
				selectedWorkspace.name,
				{
					dryRun: !!input.dryRun,
					environment: input.environment,
					version: input.version,
					debug: !!input.debug
				}
			);
		}
	}
});

export const commands = [
	deployCommand,
	graphCommand,
	generateWorkflowMatrixCommand,
	workflowWaitOnJobsCommand
];
