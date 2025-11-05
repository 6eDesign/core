import { z } from 'zod';
import { $ } from 'zx/core';

export { z };

export type RequiredSecrets = readonly string[];

export interface ISecretProvider<TSecrets extends RequiredSecrets = RequiredSecrets> {
	getSecret: (name: TSecrets[number]) => Promise<string>;
}

export interface DeployOptions {
	dryRun: boolean;
	version?: string;
	workspaceName: string;
}

export type DeploymentState = 'pending' | 'deploying' | 'deployed';

export interface DeployablePlugin<
	TInput = any,
	TOutput = any,
	TSecrets extends RequiredSecrets = RequiredSecrets
> {
	input: z.Schema<TInput>;
	output?: z.Schema<TOutput>;
	requiredSecrets?: TSecrets;
	deployHandler: (
		config: TInput,
		context: DeployOptions & {
			secretProvider: ISecretProvider<TSecrets>;
			$: typeof $;
		}
	) => Promise<TOutput>;
}

export type PluginMap = Record<string, DeployablePlugin>;

/**
 * Converts intersection types like `{a: 1} & {b: 2}` into flat types like `{a: 1, b: 2}`.
 * Necessary because TypeScript doesn't automatically resolve intersections during property lookup.
 */
export type Simplify<T> = { [K in keyof T]: T[K] };

/**
 * Extracts the output keys from a plugin's output schema for type-safe output references.
 * Returns `string` if the plugin has no output schema.
 */
export type OutputKeys<TPlugin> = TPlugin extends { output?: infer TSchema }
	? TSchema extends z.ZodObject<any, any>
		? keyof z.infer<TSchema> & string
		: string
	: string;

export function createSecretProvider<TSecrets extends RequiredSecrets>(
	getSecretFn: (name: TSecrets[number]) => Promise<string>
): ISecretProvider<TSecrets> {
	return {
		getSecret: getSecretFn
	};
}
