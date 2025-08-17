import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DeploymentService } from '@6edesign/cli/src/services/deployment.service';
import { EnvSecretProvider } from '@6edesign/cli/src/services/envSecretProvider';
import { CicdEngine, createPlugin } from '@6edesign/cicd-core';
import { z } from 'zod';
import { execa } from 'execa';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';
import cicd from '@6edesign/cicd'; // Import the real module

// --- Mocks for external dependencies ---
vi.mock('execa');
vi.mock('fs/promises');
vi.mock('os', () => ({
  tmpdir: vi.fn(() => '/tmp'),
}));

describe('DeploymentService - Isolated Test', () => {
  let deploymentService: DeploymentService;
  let mockEnvSecretProvider: EnvSecretProvider;

  beforeEach(async () => {
    vi.resetModules(); // Clear module cache

    // Dynamically import DeploymentService after mocks are set up
    const { DeploymentService: ImportedDeploymentService } = await import('@6edesign/cli/src/services/deployment.service');
    deploymentService = new ImportedDeploymentService();

    // Clear mocks for each test
    vi.mocked(execa).mockClear();
    vi.mocked(fs.mkdtemp).mockClear();
    vi.mocked(fs.writeFile).mockClear();
    vi.mocked(fs.rm).mockClear();
    vi.mocked(os.tmpdir).mockClear();

    // Setup EnvSecretProvider mock
    mockEnvSecretProvider = new EnvSecretProvider();
    vi.spyOn(mockEnvSecretProvider, 'getSecret').mockImplementation(async (key: string) => {
      if (key === 'DOCKER_USERNAME') return 'testuser';
      if (key === 'DOCKER_PASSWORD') return 'testpass';
      throw new Error(`Secret ${key} not found`);
    });

    // --- New mocking strategy: Spy on properties of the real cicd module ---
    vi.spyOn(cicd, 'plugins', 'get').mockReturnValue({
      dockerImage: createPlugin({
        input: z.object({ name: z.string() }),
        requiredSecrets: ['DOCKER_USERNAME', 'DOCKER_PASSWORD'],
        deployHandler: vi.fn(async (config, context) => {
          return Promise.resolve();
        }),
      }),
    });

    vi.spyOn(cicd, 'pulumi', 'get').mockReturnValue({
      organization: 'mock-org',
      project: 'mock-project',
      environments: {
        dev: 'mock-dev-stack',
        staging: 'mock-staging-stack',
        prod: 'mock-prod-stack',
      },
    });

    // Mock fs and execa behavior
    vi.mocked(fs.mkdtemp).mockResolvedValue('/tmp/mock-pulumi-dir');
    vi.mocked(execa).mockResolvedValue({ stdout: 'mocked pulumi output', stderr: '', exitCode: 0 } as any);
  });

  it('should execute with a valid environment', async () => {
    const cicdConfig = {
      deployables: [
        {
          name: 'my-app',
          __pluginType: 'dockerImage',
          image: 'my-app:latest',
        },
      ],
    };

    const options = { dryRun: false, environment: 'dev' };

    await expect(deploymentService.execute(cicd, cicdConfig, 'my-app', options)).resolves.not.toThrow();
  });
});
