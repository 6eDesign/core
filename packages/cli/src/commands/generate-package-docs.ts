import { defineCommand } from '../utils/defineCommand';
import { WorkspaceService } from '../services/workspace.service';
import { join } from 'path';
import { promises as fs } from 'fs';
import { execa } from 'execa';
import { z } from 'zod';

export const generatePackageDocsCommand = defineCommand({
	name: 'generate-package-docs',
	description: 'Generates API documentation for all packages',
	inputs: {
		output: {
			schema: z.string().default('apps/docs/static/api-docs/'),
			description: 'The output directory for the documentation'
		},
		dryRun: {
			schema: z.string().optional(),
			description: 'Log the command instead of executing it'
		}
	},
	handler: async ({ output, dryRun }) => {
		const workspaceService = new WorkspaceService();
		const workspaces = await workspaceService.discoverWorkspaces();

		const entryPoints = [];
		const readmeArgs = [];

		for (const workspace of workspaces) {
			const pkg = workspace.pkgJson;
			if (pkg.private || pkg['6e']?.generateDocs === false) {
				continue;
			}

			let hasEntryPoint = false;
			if (pkg.exports) {
				hasEntryPoint = true;
				entryPoints.push(join(workspace.path));
				if (pkg.scripts?.build?.includes('tsdown')) {
					entryPoints.push(join(workspace.path, 'src'));
				} else {
					entryPoints.push(join(workspace.path, 'dist/*.d.ts'));
				}
			} else if (pkg.main) {
				entryPoints.push(join(workspace.path, pkg.main));
				hasEntryPoint = true;
			} else if (pkg.types) {
				// Handle packages with only a 'types' field
				entryPoints.push(join(workspace.path, pkg.types));
				hasEntryPoint = true;
			}

			if (hasEntryPoint) {
				// Only add readme if an entry point was found
				const readmePath = join(workspace.path, 'README.md');
				try {
					await fs.access(readmePath);
					readmeArgs.push('--readme', readmePath);
				} catch {
					// no readme
				}
			}
		}

		if (entryPoints.length > 0) {
			const typedocArgs = [
				'typedoc',
				'--out',
				output
				// ...entryPoints
			];

			const command = `pnpm ${typedocArgs.join(' ')}`;

			if (dryRun) {
				console.log(command);
			} else {
				await execa('pnpm', [...typedocArgs], {
					cwd: process.cwd(),
					stdout: 'inherit',
					stderr: 'inherit'
				});
			}
		} else {
			console.log('No entry points found.');
		}
	}
});
