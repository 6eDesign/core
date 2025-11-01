import { z } from 'zod';
import { $ } from 'zx/core';

export { z };

type RequiredSecrets = readonly string[];

export interface ISecretProvider<TSecrets extends RequiredSecrets = RequiredSecrets> {
	getSecret: (name: TSecrets[number]) => Promise<string>;
}

interface DeployOptions {
	dryRun: boolean;
	version?: string;
	workspaceName: string;
}

interface DeployablePlugin<TInput = any, TSecrets extends RequiredSecrets = RequiredSecrets> {
	input: z.Schema<TInput>;
	requiredSecrets?: TSecrets;
	deployHandler: (
		config: TInput,
		context: DeployOptions & {
			secretProvider: ISecretProvider<TSecrets>;
			$: typeof $;
		}
	) => Promise<any>;
}

type PluginMap = Record<string, DeployablePlugin>;

// Type for a single deployable entry with its dependencies
type DeployableEntry<TPlugins extends PluginMap, TAllKeys extends string> = {
	config: z.infer<TPlugins[keyof TPlugins]['input']> & { __pluginType: keyof TPlugins };
	dependsOn?: Array<TAllKeys>;
};

// Workspace config - generic captures actual deployable keys for type-safe dependencies
type WorkspaceConfig<
	TPlugins extends PluginMap,
	T extends Record<string, any> = Record<string, any>
> = {
	deployables: {
		[K in keyof T]: {
			config: z.infer<TPlugins[keyof TPlugins]['input']> & { __pluginType: keyof TPlugins };
			dependsOn?: Array<Exclude<keyof T, K>>;
		};
	};
};

export function createSecretProvider<TSecrets extends RequiredSecrets>(
	getSecretFn: (name: TSecrets[number]) => Promise<string>
): ISecretProvider<TSecrets> {
	return {
		getSecret: getSecretFn
	};
}

export function createPlugin<TInput, const TSecrets extends RequiredSecrets>(
	options: DeployablePlugin<TInput, TSecrets>
): DeployablePlugin<TInput, TSecrets> {
	return options;
}

interface PkgInfo {
	name: string;
	version: string;
	path: string;
	private: boolean;
}

export const workspaceService = Object.freeze({
	async getWorkspaces(): Promise<PkgInfo[]> {
		return JSON.parse((await $`pnpm --json ls --depth=-1`).stdout) as PkgInfo[];
	},
	async getWorkspace(name: string): Promise<PkgInfo | null> {
		const workspaces = await this.getWorkspaces();
		return workspaces.find((ws) => ws.name === name) || null;
	},
	async importFromWorkspace<T>(name: string, path: string): Promise<T> {
		const workspace = await this.getWorkspace(name);
		if (!workspace) {
			throw new Error(`Workspace not found: ${name}`);
		}
		return import(`${workspace.path}/${path}`) as Promise<T>;
	}
});

export class Engine<TPlugins extends PluginMap> {
	plugins: TPlugins;
	secretProvider: ISecretProvider;

	constructor(options: { plugins: TPlugins; secretProvider: ISecretProvider }) {
		this.plugins = options.plugins;
		this.secretProvider = options.secretProvider;
	}

	defineDeployableConfig<TName extends keyof TPlugins>(
		name: TName,
		input: z.infer<TPlugins[TName]['input']>
	) {
		if (!this.plugins[name]) {
			throw new Error(`Unknown plugin: ${String(name)}`);
		}
		return { __pluginType: name, ...input };
	}

	defineWorkspaceConfig<T extends Record<string, { config: any; dependsOn?: ReadonlyArray<string> }>>(
		config: {
			deployables: T;
		}
	): {
		deployables: {
			[K in keyof T]: {
				config: z.infer<TPlugins[keyof TPlugins]['input']> & { __pluginType: keyof TPlugins };
				dependsOn?: Array<Exclude<keyof T, K>>;
			};
		};
	} {
		return config as any;
	}

	async deploy(options: DeployOptions) {
		// find workspace, implement monorepo tools (assume pnpm-only support for now)
		const config = await workspaceService.importFromWorkspace<WorkspaceConfig<TPlugins>>(
			options.workspaceName,
			'cicd.config.js'
		);

		// get config from workspace, validate config, deeply, against plugins
		// determine correct deployment order while doing things in parallel where possible (all same-level deployables together)
		// for each deployable, find correct plugin and call deployHandler with input and context (replacing zx w/ logger when dryRun:true)
	}

	async deployMany(configs: DeployOptions[]) {
		return Promise.all(configs.map((config) => this.deploy(config)));
	}

	async validateConfig(config?: DeployOptions) {}
}
