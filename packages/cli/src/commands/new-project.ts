import { z } from 'zod';
import { defineCommand } from '../utils/defineCommand';
import { promises as fs } from 'fs';
import path from 'path';
import { execa } from 'execa';
import { fileURLToPath } from 'url';
import { versions } from '../versions';
import { Generator } from '../utils/generator';

const filesToTemplate = {
	'package.json': 'package.json.hbs',
	'pnpm-workspace.yaml': 'pnpm-workspace.yaml.hbs',
	'turbo.json': 'turbo.json.hbs',
	'deploy.config.mjs': 'deploy.config.mjs.hbs',
	'README.md': 'README.md.hbs',
	'GEMINI.md': 'GEMINI.md.hbs',
	'.gitignore': '.gitignore.hbs',
	'.dockerignore': '.dockerignore.hbs',
	'.nvmrc': '.nvmrc.hbs',
	'.prettierrc': '.prettierrc.hbs',
	'apps/.gitkeep': 'apps/.gitkeep.hbs',
	'packages/eslint-config/package.json': 'packages/eslint-config/package.json.hbs',
	'packages/eslint-config/README.md': 'packages/eslint-config/README.md.hbs',
	'packages/eslint-config/library.js': 'packages/eslint-config/library.js.hbs',
	'packages/tsconfig/package.json': 'packages/tsconfig/package.json.hbs',
	'packages/tsconfig/node.json': 'packages/tsconfig/node.json.hbs'
};

const filesToCopy = {
	'.github/workflows/gemini-cli.yml': '.github/workflows/gemini-cli.yml.hbs',
	'.github/workflows/gemini-issue-automated-triage.yml':
		'.github/workflows/gemini-issue-automated-triage.yml.hbs',
	'.github/workflows/gemini-issue-scheduled-triage.yml':
		'.github/workflows/gemini-issue-scheduled-triage.yml.hbs',
	'.github/workflows/gemini-pr-review.yml': '.github/workflows/gemini-pr-review.yml.hbs',
	'.github/workflows/release.yml': '.github/workflows/release.yml.hbs'
};

export const newProjectCommand = defineCommand({
	name: 'new-project',
	description: 'Bootstrap a new 6e-stack monorepo project',
	inputs: {
		name: {
			schema: z.string(),
			description:
				'The full name of the new project/repository (e.g., @scope/my-project or my-project)',
			promptConfig: {
				type: 'input',
				message: 'Enter the project name:'
			}
		},
		description: {
			schema: z.string(),
			description: 'A short description for the new project',
			promptConfig: {
				type: 'input',
				message: 'Enter the project description:'
			}
		},
		pulumiOrganization: {
			schema: z.string(),
			description: 'The Pulumi organization name',
			promptConfig: {
				type: 'input',
				message: 'Enter the Pulumi organization name:'
			}
		},
		pulumiProject: {
			schema: z.string(),
			description: 'The Pulumi project name',
			promptConfig: {
				type: 'input',
				message: 'Enter the Pulumi project name:'
			}
		},
		environments: {
			schema: z.string(),
			description: 'Comma-separated deployment environments (e.g., stg,prod)',
			promptConfig: {
				type: 'input',
				message: 'Enter comma-separated deployment environments (e.g., stg,prod):'
			}
		},
		nodeVersion: {
			schema: z.string().optional(),
			description: `The Node.js version for .nvmrc (e.g., 20.x). Default: ${versions.defaultNodeVersion}.`
		},
		typescriptVersion: {
			schema: z.string().optional(),
			description: `The TypeScript version to use. Default: ${versions.typescriptVersion}.`
		},
		skipInstall: {
			schema: z.string().optional(),
			description: "Skip the automatic 'pnpm install' step by passing 'true'."
		},
		skipEslintConfig: {
			schema: z.string().optional(),
			description: "Skip including the 'packages/eslint-config' package. Default: false."
		},
		skipTsConfig: {
			schema: z.string().optional(),
			description: "Skip including the 'packages/tsconfig' package. Default: false."
		},
		skipAppsFolder: {
			schema: z.string().optional(),
			description: "Skip including the 'apps/' folder. Default: false."
		},
		skipGithubWorkflows: {
			schema: z.string().optional(),
			description: "Skip including the '.github/workflows/' folder. Default: false."
		},
		skipChangesets: {
			schema: z.string().optional(),
			description: 'Skip initializing Changesets. Default: false.'
		}
	},
	handler: async (input) => {
		const {
			name: fullProjectName,
			description,
			pulumiOrganization,
			pulumiProject,
			environments,
			nodeVersion,
			typescriptVersion,
			skipInstall,
			skipEslintConfig,
			skipTsConfig,
			skipAppsFolder,
			skipGithubWorkflows,
			skipChangesets
		} = input;

		let projectScope: string | undefined;
		let projectName: string;

		const scopeMatch = fullProjectName.match(/^@([^/]+)\/(.*)$/);
		if (scopeMatch) {
			projectScope = scopeMatch[1];
			projectName = scopeMatch[2];
		} else {
			projectName = fullProjectName;
		}

		const projectDir = path.join(process.cwd(), projectName);
		const currentDir = path.dirname(fileURLToPath(import.meta.url));
		const templatesDir = path.join(currentDir, '../templates/new-project');

		console.log(`Bootstrapping new project '${fullProjectName}' at ${projectDir}...`);

		try {
			const filteredFilesToTemplate = Object.fromEntries(
				Object.entries(filesToTemplate).filter(([outputFileName]) => {
					if (outputFileName.startsWith('packages/eslint-config') && skipEslintConfig === 'true')
						return false;
					if (outputFileName.startsWith('packages/tsconfig') && skipTsConfig === 'true')
						return false;
					if (outputFileName.startsWith('apps/') && skipAppsFolder === 'true') return false;
					if (outputFileName.startsWith('.changeset') && skipChangesets === 'true') return false;
					return true;
				})
			);

			const generator = new Generator(templatesDir, projectDir);
			const resolvedNodeVersion = nodeVersion || versions.defaultNodeVersion;
			await generator.run(filteredFilesToTemplate, {
				...versions,
				projectName,
				projectDescription: description,
				projectScope:
					projectScope === undefined ? '6edesign' : projectScope === '' ? undefined : projectScope,
				pulumiOrganization,
				pulumiProject,
				environments: environments.split(',').map((env: string) => env.trim()),
				nodeVersion: resolvedNodeVersion,
				typescriptVersion: typescriptVersion || versions.typescriptVersion,
				ttsconfigNodeVersion: `node${resolvedNodeVersion.split('.')[0]}`
			});

			if (skipGithubWorkflows !== 'true') {
				await generator.copyFiles(filesToCopy);
			}

			// Initialize Changesets if not skipped
			if (skipChangesets !== 'true') {
				console.log('Initializing Changesets...');
				await execa('pnpm', ['dlx', '@changeset/cli', 'init'], {
					cwd: projectDir,
					stdio: 'inherit'
				});

				// Modify Changeset config.json
				const changesetConfigPath = path.join(projectDir, '.changeset', 'config.json');
				const changesetConfig = JSON.parse(await fs.readFile(changesetConfigPath, 'utf8'));

				changesetConfig.changelog = [
					'@changesets/changelog-github',
					{ repo: `${pulumiOrganization}/${pulumiProject}` }
				];
				changesetConfig.access = 'restricted'; // Assuming private packages
				changesetConfig.baseBranch = 'main'; // Assuming main branch
				changesetConfig.linked = true; // Assuming linked packages

				await fs.writeFile(changesetConfigPath, JSON.stringify(changesetConfig, null, 2));
				console.log('Changeset config updated.');
			}

			console.log(`Successfully bootstrapped project '${fullProjectName}'!`);

			if (skipInstall !== 'true') {
				console.log('Running pnpm install...');
				await execa('pnpm', ['install'], { cwd: projectDir, stdio: 'inherit' });
				console.log('Dependencies installed.');

				console.log('Adding CLI and CICD packages...');
				await execa('pnpm', ['add', '@6edesign/cli@latest', '@6edesign/cicd@latest', '-D', '-w'], {
					cwd: projectDir,
					stdio: 'inherit'
				});
				console.log('CLI and CICD packages added.');
			} else {
				console.log('Skipping dependency installation.');
			}
		} catch (error: any) {
			console.error(`Failed to bootstrap project: ${error.message}`);
		}
	}
});
