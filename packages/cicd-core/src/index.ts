import { z } from 'zod';

export { z }; // Export the zod instance

// Inline schema definitions for now
const BaseDeployableSchema = z.object({
	name: z.string(),
	__pluginType: z.string(), // Discriminator field for the plugin type
	dependencies: z.array(z.string()).optional()
});

const CommandSchema = z.object({
	type: z.string(),
	run: z.string()
});

const WorkspaceCommandsSchema = z
	.object({
		test: CommandSchema.optional(),
		build: CommandSchema.optional()
	})
	.partial();

interface ISecretProvider {
	getSecret: (name: string) => Promise<string>;
}

export interface DeployablePlugin<TInput = any> {
	input: z.Schema<TInput>;
	requiredSecrets?: string[];
	deployHandler: (
		config: TInput,
		context: {
			dryRun: boolean;
			secretProvider: ISecretProvider;
			version?: string;
			workspaceName: string;
		}
	) => Promise<any>;
}

export function createPlugin<TInput>(options: DeployablePlugin<TInput>): DeployablePlugin<TInput> {
	return options;
}

const PulumiConfigSchema = z.object({
	organization: z.string(),
	project: z.string(),
	environments: z.record(z.string(), z.string())
});

export function createCicdEngine<TPlugins extends Record<string, DeployablePlugin>>(options: {
	plugins: TPlugins;
	pulumiConfig?: z.infer<typeof PulumiConfigSchema>;
}) {
	const { plugins, pulumiConfig } = options;

	// Collect all deployable schemas for discriminated union
	const deployableSchemas = Object.entries(plugins).map(
		([pluginTypeName, plugin]) =>
			BaseDeployableSchema.extend({
				__pluginType: z.literal(pluginTypeName)
			}).merge(plugin.input as z.ZodObject<any>) // Use plugin.input directly
	);

	const cicdConfigSchema = z.object({
		deployables: z.array(
			z.discriminatedUnion(
				'__pluginType',
				deployableSchemas as [z.ZodObject<any>, ...z.ZodObject<any>[]] // Cast for discriminatedUnion
			)
		),
		commands: WorkspaceCommandsSchema.optional()
	});

	type CreateDeployableFunction = <TName extends keyof TPlugins>(
		name: TName,
		input: z.infer<TPlugins[TName]['input']> // Updated type inference
	) => ReturnType<(typeof cicdConfigSchema)['parse']>['deployables'][number];

	const createDeployable = <TName extends keyof TPlugins>(
		name: TName,
		input: z.infer<TPlugins[TName]['input']>
	) => {
		const plugin = plugins[name];
		if (!plugin) {
			throw new Error(`Unknown plugin: ${String(name)}`);
		}

		// The object is constructed here, validation happens in defineConfig
		return { __pluginType: name, ...input };
	};

	const engine = {
		defineConfig: (config: {
			deployables: Array<ReturnType<typeof createDeployable>>;
			commands?: z.infer<typeof WorkspaceCommandsSchema>;
		}) => {
			const parsedConfig = cicdConfigSchema.parse(config);
			const validatedConfig = engine.validateDependencies(parsedConfig);
			return {
				config: validatedConfig,
				engine: engine
			};
		},
		defineProjectConfig: (config: {
			environments: string[];
		}) => {
			const ProjectConfigSchema = z.object({
				environments: z.array(z.string())
			});
			return ProjectConfigSchema.parse(config);
		},
		createDeployable,
		createCommand: (run: string) => ({ type: 'default', run }),
		plugins: plugins, // Expose the plugins map
		pulumi: pulumiConfig,
		validateDependencies: (config: {
			deployables: Array<ReturnType<typeof createDeployable>>;
			commands?: z.infer<typeof WorkspaceCommandsSchema>;
		}) => {
			const deployableNames = new Set(config.deployables.map((d) => d.name));
			for (const deployable of config.deployables) {
				if (deployable.dependencies) {
					for (const dep of deployable.dependencies) {
						if (!deployableNames.has(dep)) {
							throw new Error(
								`Deployable '${deployable.name}' has an undeclared dependency: '${dep}'`
							);
						}
					}
				}
			}
			return config;
		}
	};

	return engine;
}

export type CicdEngine<TPlugins extends Record<string, DeployablePlugin>> = ReturnType<
	typeof createCicdEngine<TPlugins>
>;

export function createChildCicdEngine<TPlugins extends Record<string, DeployablePlugin>>(
	parentEngine: CicdEngine<any>,
	options: {
		plugins?: TPlugins;
		pulumiConfig?: z.infer<typeof PulumiConfigSchema>;
	}
): CicdEngine<TPlugins> {
	const mergedPlugins = { ...parentEngine.plugins, ...options.plugins };
	const mergedPulumiConfig = options.pulumiConfig || parentEngine.pulumi;

	return createCicdEngine({
		plugins: mergedPlugins,
		pulumiConfig: mergedPulumiConfig
	});
}
