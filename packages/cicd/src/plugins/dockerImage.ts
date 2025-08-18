import { createPlugin, z } from '../engine';
import * as pulumi from '@pulumi/pulumi';
import * as dockerBuild from '@pulumi/docker-build';
import { promises as fs } from 'fs';
import path from 'path';
import { config } from 'process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DEFAULT_REGISTRY = 'https://index.docker.io/v1/';

const fileBuildOptions = z.object({
	type: z.literal('file').describe('Indicates that a Dockerfile is provided by file path.'),
	file: z.string().describe('The path to the Dockerfile.'),
	context: z.string().optional().describe('The build context path for Docker.')
});

const generatedBuildOptions = z.object({
	type: z.literal('generated').describe('Indicates that the Dockerfile should be generated.'),
	baseImage: z.string().describe('The base image for the generated Dockerfile.'),
	osDependenciesInstallCommand:
		z.string()
			.optional()
			.describe(
				'The full command to install OS-level dependencies (e.g., RUN apt-get update && apt-get install -y curl).'
			),
	workspace: z.string().describe('The workspace path to include in the generated Dockerfile.'),
	cmd: z.string().default('node server.js'),
	env:
		z.record(z.string(), z.string())
			.optional()
			.describe('Environment variables to set in the Dockerfile.')
});

export const dockerImagePlugin = createPlugin({
	input: z.object({
		name: z.string().describe('A unique name for this deployable Docker image.'),
		image: z.string().describe('The name of the Docker image to build (e.g., my-app).'),
		args:
			z.record(z.string(), z.string())
				.optional()
				.describe('Build arguments to pass to Docker.'),
		target: z.string().optional().describe('The build target stage in the Dockerfile.'),
		additionalTags:
			z.union([z.string(), z.array(z.string())])
				.optional()
				.describe('A single tag or an array of tags for the Docker image.'),
		registry: z.string().optional().describe('An optional Docker registry to push the image to.'),
		build: z.union([fileBuildOptions, generatedBuildOptions])
	}),
	requiredSecrets: ['DOCKER_USERNAME', 'DOCKER_PASSWORD'],
	deployHandler: async (config, context) => {
		// --- 1. Tagging Logic ---
		const finalTags: string[] = [];
		// Example: jgreenemeier/stacker:rebrowse-app
		const baseImageTag = `${config.image}:${config.name}`;
		finalTags.push(baseImageTag);

		if (context.version) {
			// Example: jgreenemeier/stacker:rebrowse-app-v1.0.0
			finalTags.push(`${config.image}:${config.name}-v${context.version}`);
		}

		const additionalTags = Array.isArray(config.additionalTags)
			? config.additionalTags
			: config.additionalTags
				? [config.additionalTags]
				: [];
		additionalTags.forEach((tag) => {
			// Example: jgreenemeier/stacker:rebrowse-app-beta
			finalTags.push(`${config.image}:${config.name}-${tag}`);
		});

		// --- 2. Dockerfile and Context Logic ---
		let dockerfile: dockerBuild.Dockerfile;
		let buildContext: dockerBuild.Context;

		if (config.build.type === 'file') {
			dockerfile = { location: config.build.file };
			buildContext = { location: config.build.context || '.' };
		} else {
			// Generated Dockerfile
			const currentModulePath = fileURLToPath(import.meta.url);
			const currentModuleDir = dirname(currentModulePath);
			const templatePath = path.join(
				currentModuleDir,
				'templates',
				'Dockerfile.generated.template'
			);
			const templateContent = await fs.readFile(templatePath, 'utf-8');

			const envVars = config.build.env
				? Object.entries(config.build.env)
						.map(([key, value]) => `ENV ${key}=${value}`)
						.join('\n')
				: '';

			const generatedContent = templateContent
				.replace('{{BASE_IMAGE}}', config.build.baseImage)
				.replace('{{OS_DEPENDENCIES_INSTALL}}', config.build.osDependenciesInstallCommand || '')
				.replace('{{WORKSPACE}}', config.build.workspace)
				.replace('{{ENV_VARS}}', envVars)
				.replace('{{CMD}}', config.build.cmd);

			dockerfile = { inline: generatedContent };
			buildContext = { location: '.' }; // Context for generated is always root
		}

		// --- 3. Image Resource Arguments ---
		const imageArgs: dockerBuild.ImageArgs = {
			tags: finalTags,
			context: buildContext,
			dockerfile: dockerfile,
			buildArgs: config.args,
			target: config.target,
			load: true,
			push: !context.dryRun
		};

		if (imageArgs.push) {
			imageArgs.registry = {
				server: config.registry || DEFAULT_REGISTRY,
				username: await context.secretProvider.getSecret('DOCKER_USERNAME'),
				password: await context.secretProvider.getSecret('DOCKER_PASSWORD')
			};
		}

		// --- 4. Instantiate Resource ---
		const img = new dockerBuild.Image(config.name, imageArgs);

		return {
			imageRef: img.ref
		};
	}
});
