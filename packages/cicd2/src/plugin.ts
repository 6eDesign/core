import { z } from 'zod';
import { $ } from 'zx/core';
import type { DeployOptions, ISecretProvider, RequiredSecrets } from './types.js';

/**
 * Define a deployable plugin with input/output schemas and deploy handler.
 *
 * Uses `const` type parameters to preserve literal schema types for full type safety.
 * The builder API will provide autocomplete for output keys based on the output schema.
 *
 * @example
 * ```ts
 * const docker = createPlugin({
 *   input: z.object({ imageName: z.string() }),
 *   output: z.object({ imageId: z.string() }),
 *   deployHandler: async (config, ctx) => {
 *     // deploy logic
 *     return { imageId: 'sha256:...' };
 *   }
 * });
 * ```
 */
export function createPlugin<
	const TInputSchema extends z.Schema,
	const TOutputSchema extends z.Schema | undefined,
	const TSecrets extends RequiredSecrets
>(options: {
	input: TInputSchema;
	output?: TOutputSchema;
	requiredSecrets?: TSecrets;
	deployHandler: (
		config: z.infer<TInputSchema>,
		context: DeployOptions & {
			secretProvider: ISecretProvider<TSecrets>;
			$: typeof $;
		}
	) => Promise<TOutputSchema extends z.Schema<infer T> ? T : any>;
}): typeof options {
	return options;
}
