import { z } from 'zod';
import type { PluginMap, Simplify, OutputKeys } from './types.js';

/**
 * Represents a deployable with its configuration and dependencies.
 * The generic `TAvailableDeps` constrains which deployables can be referenced in `dependsOn()`.
 */
export class DeployableEntry<TAvailableDeps extends string = never> {
	constructor(
		readonly name: string,
		readonly pluginName: string,
		readonly config: any,
		readonly dependencies: string[] = []
	) {}

	dependsOn(...deps: TAvailableDeps[]): this {
		return new DeployableEntry(this.name, this.pluginName, this.config, [
			...this.dependencies,
			...deps
		]) as this;
	}
}

/**
 * Marker object representing a reference to another deployable's output.
 * Resolved at deploy-time, not at build-time.
 */
export class OutputReference {
	constructor(readonly deployableName: string, readonly outputKey: string) {}
}

/**
 * Builder for defining a workspace with type-safe deployables, dependencies, and output references.
 *
 * @template TPlugins - Map of available plugin names to plugin definitions
 * @template TDefined - Accumulates defined deployables as `Record<name, pluginName>` for type safety
 */
export class WorkspaceBuilder<
	TPlugins extends PluginMap,
	TDefined extends Record<string, keyof TPlugins> = {}
> {
	public readonly deployables: Map<string, DeployableEntry> = new Map();
	private currentDeployableName: string | null = null;

	constructor(private plugins: TPlugins) {}

	/**
	 * Add a deployable to the workspace. The callback receives the builder and must return a deployable entry.
	 * Type accumulation: Each `.add()` call grows `TDefined` to enable autocomplete for later references.
	 */
	add<TName extends string, TPluginName extends keyof TPlugins & string>(
		name: TName,
		cb: (builder: this) => DeployableEntry<keyof TDefined & string>
	): WorkspaceBuilder<TPlugins, TDefined & Record<TName, TPluginName>> {
		this.currentDeployableName = name;
		const entry = cb(this);
		this.deployables.set(name, entry);
		this.currentDeployableName = null;
		return this as any; // Safe: type assertion to thread accumulated TDefined
	}

	/**
	 * Define a deployable using a specific plugin. Must be called within `.add()` callback.
	 * Input is validated against the plugin's Zod schema at compile-time.
	 */
	deployable<TName extends keyof TPlugins & string>(
		pluginName: TName,
		input: z.infer<TPlugins[TName]['input']>
	): DeployableEntry<keyof TDefined & string> {
		if (!this.plugins[pluginName]) {
			throw new Error(`Unknown plugin: ${String(pluginName)}`);
		}
		if (!this.currentDeployableName) {
			throw new Error(`deployable() must be called within add() callback`);
		}

		const configWithType = { __pluginType: pluginName, ...input } as z.infer<
			TPlugins[TName]['input']
		> & { __pluginType: TName };

		return new DeployableEntry(this.currentDeployableName, pluginName, configWithType, []);
	}

	/**
	 * Create a reference to another deployable's output. Returns a marker object resolved at deploy-time.
	 *
	 * @param deployableName - Name of a previously defined deployable
	 * @param outputKey - Key from the deployable's plugin output schema (type-safe)
	 */
	output<
		TName extends keyof TDefined,
		TKey extends OutputKeys<TPlugins[Simplify<TDefined>[TName]]>
	>(deployableName: TName, outputKey: TKey): OutputReference {
		return new OutputReference(deployableName as string, outputKey);
	}
}
