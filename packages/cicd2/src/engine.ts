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

import { $ } from 'zx/core';
import type { PluginMap, ISecretProvider, DeployOptions } from './types.js';
import { WorkspaceBuilder } from './workspace-builder.js';
import { workspaceService } from './workspace-service.js';

interface DeploymentState {}

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

	async deployWorkspaceDeployable(options: DeployOptions & { deployableName: string }) {
		// get config from workspace, validate config, deeply, against plugins
		const {
			default: { deployables }
		} = await workspaceService.importFromWorkspace<{
			default: WorkspaceBuilder<TPlugins>;
		}>(options.workspaceName, 'cicd.config.js');

		const deployable = deployables.get(options.deployableName);
		if (!deployable) {
			throw new Error(
				`Deployable ${options.deployableName} not found in workspace ${options.workspaceName}`
			);
		}

		// find correct plugin
		const plugin = this.plugins[deployable.pluginName];
		if (!plugin) {
			throw new Error(
				`Plugin ${deployable.pluginName} not found for deployable ${options.deployableName}`
			);
		}

		// call deployHandler with input and context (replacing zx w/ logger when dryRun:true)
		const output = await plugin.deployHandler(deployable.config, {
			...options,
			secretProvider: this.secretProvider,
			$: options.dryRun ? ((async (...args: string[]) => console.log(...args)) as $) : $
		});

		return output;
	}

	async deploy(options: DeployOptions) {
		// get config from workspace, validate config, deeply, against plugins
		const {
			default: { deployables }
		} = await workspaceService.importFromWorkspace<{
			default: WorkspaceBuilder<TPlugins>;
		}>(options.workspaceName, 'cicd.config.js');

		// determine correct deployment order while doing things in parallel where possible (all same-level deployables together)
		await Promise.all(
			Array.from(deployables.entries()).map(async ([name, deployable]) => {
				// find correct plugin
				const plugin = this.plugins[deployable.pluginName];
				if (!plugin) {
					throw new Error(`Plugin ${deployable.pluginName} not found for deployable ${name}`);
				}

				if (deployable.dependencies.length > 0) {
					await Promise.all(
						deployable.dependencies.map((depName) => {
							const depDeployable = deployables.get(depName);
							if (!depDeployable) {
								throw new Error(
									`Dependency deployable ${depName} not found for deployable ${name}`
								);
							}
							return depDeployable.deploy();
						})
					);
				}

				deployables.get(name)?.setDeploymentState('deploying');

				// call deployHandler with input and context (replacing zx w/ logger when dryRun:true)
				const output = await plugin.deployHandler(deployable.config, {
					...options,
					secretProvider: this.secretProvider,
					$: options.dryRun ? ((async (...args: string[]) => console.log(...args)) as $) : $
				});

				deployables.get(name)?.setDeploymentState('deployed');
			})
		);

		// for each deployable, find correct plugin and call deployHandler with input and context (replacing zx w/ logger when dryRun:true)
	}

	async deployMany(configs: DeployOptions[]) {
		return Promise.all(configs.map((config) => this.deploy(config)));
	}

	async validateConfig(config?: DeployOptions) {}
}
