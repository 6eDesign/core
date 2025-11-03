// Re-export public API
export { z } from './types.js';
export { createSecretProvider } from './types.js';
export { createPlugin } from './plugin.js';
export { WorkspaceBuilder, DeployableEntry, OutputReference } from './workspace-builder.js';
export { workspaceService } from './workspace-service.js';

export type {
	RequiredSecrets,
	ISecretProvider,
	DeployOptions,
	DeployablePlugin,
	PluginMap
} from './types.js';

import type { PluginMap, ISecretProvider, DeployOptions } from './types.js';
import { WorkspaceBuilder } from './workspace-builder.js';
import { workspaceService } from './workspace-service.js';

export class Engine<TPlugins extends PluginMap> {
	plugins: TPlugins;
	secretProvider: ISecretProvider;

	constructor(options: { plugins: TPlugins; secretProvider: ISecretProvider }) {
		this.plugins = options.plugins;
		this.secretProvider = options.secretProvider;
	}

	defineWorkspace() {
		return new WorkspaceBuilder(this.plugins);
	}

	async deploy(options: DeployOptions) {
		// get config from workspace, validate config, deeply, against plugins
		const {
			default: { deployables }
		} = await workspaceService.importFromWorkspace<{
			default: WorkspaceBuilder<TPlugins>;
		}>(options.workspaceName, 'cicd.config.js');

		// determine correct deployment order while doing things in parallel where possible (all same-level deployables together)
		console.log('Deployables:', Array.from(deployables.keys()));

		// for each deployable, find correct plugin and call deployHandler with input and context (replacing zx w/ logger when dryRun:true)
	}

	async deployMany(configs: DeployOptions[]) {
		return Promise.all(configs.map((config) => this.deploy(config)));
	}

	async validateConfig(config?: DeployOptions) {}
}
