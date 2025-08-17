import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fs from 'fs';
import path from 'path';
import { Image as mockedDockerImage } from '@pulumi/docker';

vi.mock('fs', async (importOriginal) => {
	const actual = await importOriginal<typeof fs>();
	return {
		...actual,
		promises: {
			...actual.promises,
			readFile: vi.fn(async (filePath, encoding) => {
				if (filePath.includes('Dockerfile.generated.template')) {
					const templatePath = path.resolve(
						__dirname,
						'../../src/templates/Dockerfile.generated.template'
					);
					return actual.promises.readFile(templatePath, encoding);
				}
				return actual.promises.readFile(filePath, encoding);
			}),
			writeFile: vi.fn()
		}
	};
});

vi.mock('@pulumi/docker', () => ({
	Image: vi.fn()
}));

// Import the module *after* the mocks have been set up
import { dockerImagePlugin } from '../../src/plugins/dockerImage';

describe('dockerImagePlugin', () => {
	// Spy on console.log to capture its output
	const consoleLogSpy = vi.spyOn(console, 'log');

	// Clear mocks before each test
	beforeEach(() => {
		vi.mocked(fs.promises.writeFile).mockClear();
		vi.mocked(mockedDockerImage).mockClear();
		consoleLogSpy.mockClear();
	});

	const mockContext = {
		dryRun: true,
		secretProvider: {
			getSecret: vi.fn((key) => {
				if (key === 'DOCKER_USERNAME') return 'testuser';
				if (key === 'DOCKER_PASSWORD') return 'testpass';
				return undefined;
			})
		}
	};

	it('should generate Dockerfile content correctly for generated type in dry run', async () => {
		const config = {
			name: 'test-app',
			image: 'test-image',
			build: {
				type: 'generated',
				baseImage: 'node:18-alpine',
				osDependenciesInstallCommand: 'RUN apk add --no-cache git',
				workspace: 'apps/test-app',
				cmd: 'node index.js',
				env: {
					MY_ENV_VAR: 'my-value'
				}
			}
		};

		await dockerImagePlugin.deployHandler(config as any, mockContext as any);

		expect(fs.promises.writeFile).toHaveBeenCalledTimes(0); // Should not write in dry run
		expect(mockedDockerImage).toHaveBeenCalledTimes(0); // Should not create Pulumi resource in dry run
		const logOutput = vi.mocked(console.log).mock.calls[1][0]; // Get the dry run log output

		expect(logOutput).toContain('FROM node:18-alpine AS base');
		expect(logOutput).toContain('ENV PNPM_HOME="/pnpm"');
		expect(logOutput).toContain('ENV PATH="$PNPM_HOME:$PATH"');
		expect(logOutput).toContain('RUN corepack enable');
		expect(logOutput).toContain('ENV MY_ENV_VAR=my-value');
		expect(logOutput).toContain('RUN apk add --no-cache git');
		expect(logOutput).toContain('CMD node index.js');
	});

	it('should handle missing osDependenciesInstallCommand and env correctly in dry run', async () => {
		const config = {
			name: 'test-app-no-deps',
			image: 'test-image-no-deps',
			build: {
				type: 'generated',
				baseImage: 'node:18-alpine',
				workspace: 'apps/test-app-no-deps',
				cmd: 'node index.js'
			}
		};

		await dockerImagePlugin.deployHandler(config as any, mockContext as any);

		expect(fs.promises.writeFile).toHaveBeenCalledTimes(0);
		expect(mockedDockerImage).toHaveBeenCalledTimes(0);
		const logOutput = vi.mocked(console.log).mock.calls[1][0];

		expect(logOutput).not.toContain('OS_DEPENDENCIES_INSTALL'); // Should not contain placeholder
		expect(logOutput).not.toContain('{{ENV_VARS}}'); // Should not contain the ENV_VARS placeholder
	});

	it('should not generate Dockerfile content for file type in dry run', async () => {
		const config = {
			name: 'test-app-file',
			image: 'test-image-file',
			build: {
				type: 'file',
				file: './Dockerfile',
				context: '.'
			}
		};

		await dockerImagePlugin.deployHandler(config as any, mockContext as any);

		expect(fs.promises.writeFile).toHaveBeenCalledTimes(0); // Should not write for file type
		expect(mockedDockerImage).toHaveBeenCalledTimes(0); // Should not create Pulumi resource
	});

	it('should create a Pulumi Docker Image resource for generated type in non-dry run', async () => {
		const nonDryRunContext = { ...mockContext, dryRun: false };
		const config = {
			name: 'test-app-non-dry-run',
			image: 'test-image-non-dry-run',
			tag: 'v1.0.0',
			registry: 'myregistry.com',
			args: {
				BUILD_ARG_KEY: 'build-arg-value'
			},
			target: 'builder',
			build: {
				type: 'generated',
				baseImage: 'node:18-alpine',
				osDependenciesInstallCommand: 'RUN apk add --no-cache git',
				workspace: 'apps/test-app',
				cmd: 'node index.js',
				env: {
					MY_ENV_VAR: 'my-value'
				}
			}
		};

		await dockerImagePlugin.deployHandler(config as any, nonDryRunContext as any);

		expect(fs.promises.writeFile).toHaveBeenCalledTimes(1); // Should write generated Dockerfile
		expect(mockedDockerImage).toHaveBeenCalledTimes(1); // Should create Pulumi resource

		const expectedImageName = 'myregistry.com/test-image-non-dry-run:v1.0.0';
		const expectedBuildContext = '.';
		const expectedDockerfile = `/tmp/Dockerfile.${config.name}`;
		const expectedBuildArgs = { BUILD_ARG_KEY: 'build-arg-value' };
		const expectedTarget = 'builder';
		const expectedRegistryAuth = [
			{
				username: 'testuser',
				password: 'testpass',
				server: 'myregistry.com'
			}
		];

		expect(mockedDockerImage).toHaveBeenCalledWith(
			config.name,
			expect.objectContaining({
				imageName: expectedImageName,
				build: expect.objectContaining({
					context: expectedBuildContext,
					dockerfile: expectedDockerfile,
					args: expectedBuildArgs,
					target: expectedTarget
				}),
				registryAuth: expectedRegistryAuth
			})
		);
	});

	it('should create a Pulumi Docker Image resource for file type in non-dry run', async () => {
		const nonDryRunContext = { ...mockContext, dryRun: false };
		const config = {
			name: 'test-app-file-non-dry-run',
			image: 'test-image-file-non-dry-run',
			build: {
				type: 'file',
				file: './path/to/Dockerfile.prod',
				context: './path/to/context'
			}
		};

		await dockerImagePlugin.deployHandler(config as any, nonDryRunContext as any);

		expect(fs.promises.writeFile).toHaveBeenCalledTimes(0); // Should not write for file type
		expect(mockedDockerImage).toHaveBeenCalledTimes(1); // Should create Pulumi resource

		const expectedImageName = 'test-image-file-non-dry-run';
		const expectedBuildContext = './path/to/context';
		const expectedDockerfile = './path/to/Dockerfile.prod';

		expect(mockedDockerImage).toHaveBeenCalledWith(
			config.name,
			expect.objectContaining({
				imageName: expectedImageName,
				build: expect.objectContaining({
					context: expectedBuildContext,
					dockerfile: expectedDockerfile
				}),
				registryAuth: undefined // No registry specified in config
			})
		);
	});
});
