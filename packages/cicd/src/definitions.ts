import { CliCommandSchema } from '../types/cli';
import { WorkspaceService } from '../services/workspace.service';
import { ConfigService } from '../services/config.service';
import { DeploymentService } from '../services/deployment.service';
import { UiService } from '../services/ui.service';
import { z } from 'zod';
import { graphCommand } from './graph';
import { generateWorkflowMatrixCommand } from './generate-workflow-matrix';
import { workflowWaitOnJobsCommand } from './workflow-wait-on-jobs';

const deployHandler = async (
	options: z.infer<(typeof deployCommand.options)[number]> & { [key: string]: any }
) => {
	const workspaceService = new WorkspaceService();
	const configService = new ConfigService();
	const deploymentService = new DeploymentService();
	const uiService = new UiService();

	let workspaceName = options.workspace;
	let deployableName = options.deployable;
	let environment = options.environment;
	let inputParams = options.arg || {};

	if (options.argsJson) {
		inputParams = { ...inputParams, ...JSON.parse(options.argsJson) };
	}

	const workspaces = await workspaceService.discoverWorkspaces();

	if (!workspaceName) {
		workspaceName = await uiService.promptForWorkspace(workspaces);
	}

	const selectedWorkspace = workspaces.find((w) => w.name === workspaceName);
	if (!selectedWorkspace) {
		console.error(`Workspace '${workspaceName}' not found.`);
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

	const deployables = workspaceConfig.config.deployables;

	if (!deployableName) {
		deployableName = await uiService.promptForDeployable(deployables);
	}

	const selectedDeployable = deployables.find((d: any) => d.name === deployableName);
	if (!selectedDeployable) {
		console.error(`Deployable '${deployableName}' not found in '${selectedWorkspace.name}'.`);
		return;
	}

	if (!environment) {
		environment = await uiService.promptForEnvironment();
	}
	if (!environment) {
		console.error('Environment is required for deployment.');
		return;
	}

	// If no params were provided via CLI, prompt the user
	if (Object.keys(inputParams).length === 0 && !options.argsJson) {
		const schema = selectedDeployable.input;
		if (schema) {
			inputParams = await uiService.promptForParameters(schema);
		}
	}

	const cicd = engine.createChildCicdEngine(engine, { pulumiConfig: projectConfig.pulumi }); // Access from engine

	await deploymentService.execute(
		cicd,
		workspaceConfig.config,
		deployableName,
		selectedWorkspace.name,
		{
			dryRun: !!options.dryRun,
			environment: environment,
			version: options.version,
			debug: !!options.debug
		}
	);
};

export const deployCommand = CliCommandSchema.parse({
	name: 'deploy',
	description: 'Deploy a workspace deployable',
	options: [
		{
			name: '--workspace <name>',
			description: 'The name of the workspace',
			type: 'string',
			required: false, // Will be prompted if missing
			prompt: {
				type: 'autocomplete',
				message: 'Select a workspace:'
				// choices will be dynamically populated by the command builder
			}
		},
		{
			name: '--deployable <name>',
			description: 'The name of the deployable to execute',
			type: 'string',
			required: false, // Will be prompted if missing
			prompt: {
				type: 'autocomplete',
				message: 'Select a deployable:'
				// choices will be dynamically populated by the command builder
			}
		},
		{
			name: '--version <version>',
			description: 'The version to deploy',
			type: 'string',
			required: false,
			prompt: {
				type: 'input',
				message: 'Enter version (optional):'
			}
		},
		{
			name: '--arg <key=value>',
			description: 'An argument for the deployable (can be used multiple times)',
			type: 'object',
			variadic: true,
			parser: (value: string, previous: { [key: string]: string } = {}) => {
				const [key, val] = value.split('=');
				previous[key] = val;
				return previous;
			},
			required: false
		},
		{
			name: '--args-json <json>',
			description: 'A JSON string of arguments for the deployable',
			type: 'string',
			required: false
		},
		{
			name: '--dry-run',
			description: 'Perform a dry run without executing external actions',
			type: 'boolean',
			required: false
		},
		{
			name: '--debug',
			description: 'Enable debug logging',
			type: 'boolean',
			required: false
		},
		{
			name: '--environment <env>',
			description: 'The deployment environment (e.g., dev, staging, prod)',
			type: 'string',
			required: false, // Will be prompted if missing
			prompt: {
				type: 'list',
				message: 'Select the deployment environment:',
				choices: ['dev', 'staging', 'prod'] // Example choices, could be dynamic
			}
		}
	],
	handler: deployHandler
});

export const commands = [
	deployCommand,
	graphCommand,
	generateWorkflowMatrixCommand,
	workflowWaitOnJobsCommand
];
