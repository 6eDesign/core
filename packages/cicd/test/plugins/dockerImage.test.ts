import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fs from 'fs';
import path from 'path';
import { Image as mockedDockerImage } from '@pulumi/docker-build';

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
			})
		}
	};
});

vi.mock('@pulumi/docker-build', () => ({
	Image: vi.fn()
}));

// Import the module *after* the mocks have been set up
import { dockerImagePlugin } from '../../src/plugins/dockerImage';

describe('dockerImagePlugin', () => {
	beforeEach(() => {
		vi.mocked(mockedDockerImage).mockClear();
	});

	const mockContext = {
		dryRun: false,
		secretProvider: {
			getSecret: vi.fn((key) => {
				if (key === 'DOCKER_USERNAME') return Promise.resolve('testuser');
				if (key === 'DOCKER_PASSWORD') return Promise.resolve('testpass');
				return Promise.resolve(undefined);
			})
		},
		version: '1.2.3'
	};

	it('should create a Pulumi Docker Image resource for generated type', async () => {
		const config = {
			name: 'test-app',
			image: 'test-image',
			additionalTags: ['latest', 'beta'],
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

		await dockerImagePlugin.deployHandler(config as any, mockContext as any);

		expect(mockedDockerImage).toHaveBeenCalledTimes(1);

		const [imageName, imageArgs] = vi.mocked(mockedDockerImage).mock.calls[0];
		expect(imageName).toBe('test-app');

		// Verify tags
		expect(imageArgs.tags).toEqual([
			'test-image:test-app',
			'test-image:test-app-v1.2.3',
			'test-image:test-app-latest',
			'test-image:test-app-beta'
		]);

		// Verify Dockerfile content
		const inlineDockerfile = imageArgs.dockerfile.inline;
		expect(inlineDockerfile).toMatchSnapshot();

		// Verify build context and other args
		expect(imageArgs.context.location).toBe('.');
		expect(imageArgs.buildArgs).toEqual({ BUILD_ARG_KEY: 'build-arg-value' });
		expect(imageArgs.target).toBe('builder');

		// Verify registry auth
		expect(imageArgs.registry.server).toBe('myregistry.com');
		expect(await imageArgs.registry.username).toBe('testuser');
		expect(await imageArgs.registry.password).toBe('testpass');
	});

	it('should handle missing optional generated build options', async () => {
		const config = {
			name: 'test-app-minimal',
			image: 'test-image-minimal',
			build: {
				type: 'generated',
				baseImage: 'node:18-alpine',
				workspace: 'apps/test-app-minimal',
				cmd: 'node server.js'
			}
		};

		await dockerImagePlugin.deployHandler(config as any, mockContext as any);

		expect(mockedDockerImage).toHaveBeenCalledTimes(1);
		const [, imageArgs] = vi.mocked(mockedDockerImage).mock.calls[0];

		const inlineDockerfile = imageArgs.dockerfile.inline;
		expect(inlineDockerfile).toMatchSnapshot();
	});

	it('should create a Pulumi Docker Image resource for file type', async () => {
		const config = {
			name: 'test-app-file',
			image: 'test-image-file',
			build: {
				type: 'file',
				file: './path/to/Dockerfile.prod',
				context: './path/to/context'
			}
		};

		await dockerImagePlugin.deployHandler(config as any, mockContext as any);

		expect(mockedDockerImage).toHaveBeenCalledTimes(1);
		const [imageName, imageArgs] = vi.mocked(mockedDockerImage).mock.calls[0];

		expect(imageName).toBe('test-app-file');
		expect(imageArgs.dockerfile.location).toBe('./path/to/Dockerfile.prod');
		expect(imageArgs.context.location).toBe('./path/to/context');
		expect(imageArgs.registry.server).toBe('https://index.docker.io/v1/'); // default
	});

	it('should handle dryRun correctly', async () => {
		const dryRunContext = { ...mockContext, dryRun: true };
		const config = {
			name: 'test-app-dry-run',
			image: 'test-image-dry-run',
			build: {
				type: 'file',
				file: './Dockerfile',
				context: '.'
			}
		};

		await dockerImagePlugin.deployHandler(config as any, dryRunContext as any);

		expect(mockedDockerImage).toHaveBeenCalledTimes(1);
		const [, imageArgs] = vi.mocked(mockedDockerImage).mock.calls[0];

		expect(imageArgs.load).toBe(true);
		expect(imageArgs.push).toBe(false);
		expect(imageArgs.registry).toBeUndefined();
	});
});