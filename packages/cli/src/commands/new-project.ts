import { z } from 'zod';
import { defineCommand } from '../utils/defineCommand';
import { promises as fs } from 'fs';
import path from 'path';
import { execa } from 'execa';
import Handlebars from 'handlebars';
import { fileURLToPath } from 'url';

const templateFilePaths = {
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
  '.changeset/README.md': '.changeset/README.md.hbs',
  '.github/workflows/gemini-cli.yml': '.github/workflows/gemini-cli.yml.hbs',
  '.github/workflows/gemini-issue-automated-triage.yml': '.github/workflows/gemini-issue-automated-triage.yml.hbs',
  '.github/workflows/gemini-issue-scheduled-triage.yml': '.github/workflows/gemini-issue-scheduled-triage.yml.hbs',
  '.github/workflows/gemini-pr-review.yml': '.github/workflows/gemini-pr-review.yml.hbs',
  '.github/workflows/release.yml': '.github/workflows/release.yml.hbs',
  'apps/.gitkeep': 'apps/.gitkeep.hbs',
  'packages/eslint-config/package.json': 'packages/eslint-config/package.json.hbs',
  'packages/eslint-config/README.md': 'packages/eslint-config/README.md.hbs',
  'packages/eslint-config/library.js': 'packages/eslint-config/library.js.hbs',
  'packages/tsconfig/package.json': 'packages/tsconfig/package.json.hbs',
  'packages/tsconfig/node.json': 'packages/tsconfig/node.json.hbs',
};

export const newProjectCommand = defineCommand({
  name: 'new-project',
  description: 'Bootstrap a new 6e-stack monorepo project',
  inputs: {
    name: {
      schema: z.string(),
      description: 'The name of the new project/repository',
      promptConfig: {
        type: 'input',
        message: 'Enter the project name:',
      },
    },
    description: {
      schema: z.string(),
      description: 'A short description for the new project',
      promptConfig: {
        type: 'input',
        message: 'Enter the project description:',
      },
    },
    projectScope: {
      schema: z.string().optional(),
      description: 'The npm scope for internal packages (e.g., @myorg). Defaults to 6edesign.',
      promptConfig: {
        type: 'input',
        message: 'Enter the npm scope (optional, e.g., @myorg): ',
        default: '6edesign',
      },
    },
    pulumiOrganization: {
      schema: z.string(),
      description: 'The Pulumi organization name',
      promptConfig: {
        type: 'input',
        message: 'Enter the Pulumi organization name:',
      },
    },
    pulumiProject: {
      schema: z.string(),
      description: 'The Pulumi project name',
      promptConfig: {
        type: 'input',
        message: 'Enter the Pulumi project name:',
      },
    },
    environments: {
      schema: z.string(),
      description: 'Comma-separated deployment environments (e.g., stg,prod)',
      promptConfig: {
        type: 'input',
        message: 'Enter comma-separated deployment environments (e.g., stg,prod):',
      },
    },
    pnpmVersion: {
      schema: z.string().optional(),
      description: 'The pnpm version to enforce (e.g., 10.15.0). Defaults to 10.15.0.',
      promptConfig: {
        type: 'input',
        message: 'Enter the pnpm version (optional, e.g., 10.15.0): ',
        default: '10.15.0',
      },
    },
    nodeVersion: {
      schema: z.string().optional(),
      description: 'The Node.js version for .nvmrc (e.g., 20.x). Defaults to 20.x.',
      promptConfig: {
        type: 'input',
        message: 'Enter the Node.js version (optional, e.g., 20.x): ',
        default: '20.x',
      },
    },
    skipInstall: {
      schema: z.string().optional(),
      description: "Skip the automatic 'pnpm install' step by passing 'true'.",
    },
    skipEslintConfig: {
      schema: z.string().optional(),
      description: "Skip including the 'packages/eslint-config' package.",
    },
    skipTsConfig: {
      schema: z.string().optional(),
      description: "Skip including the 'packages/tsconfig' package.",
    },
    skipAppsFolder: {
      schema: z.string().optional(),
      description: "Skip including the 'apps/' folder.",
    },
    skipGithubWorkflows: {
      schema: z.string().optional(),
      description: "Skip including the '.github/workflows/' folder.",
    },
    skipChangesets: {
      schema: z.string().optional(),
      description: "Skip initializing Changesets.",
    },
  },
  handler: async (input) => {
    const { name, description, projectScope, pulumiOrganization, pulumiProject, environments, pnpmVersion, nodeVersion, skipInstall, skipEslintConfig, skipTsConfig, skipAppsFolder, skipGithubWorkflows, skipChangesets } = input;

    const projectDir = path.join(process.cwd(), name);
    const currentDir = path.dirname(fileURLToPath(import.meta.url));
    const templatesDir = path.join(currentDir, '../../templates/new-project');

    console.log(`Bootstrapping new project '${name}' at ${projectDir}...`);

    try {
      // Check if directory exists and is not empty
      try {
        const stats = await fs.stat(projectDir);
        if (stats.isDirectory()) {
          const files = await fs.readdir(projectDir);
          if (files.length > 0) {
            throw new Error(`Target directory '${projectDir}' is not empty. Aborting to prevent accidental overwrite.`);
          }
        }
      } catch (error: any) {
        if (error.code !== 'ENOENT') { // Ignore if directory simply doesn't exist
          throw error;
        }
      }

      // Create project directory
      await fs.mkdir(projectDir, { recursive: true });

      // Define files to create based on skip flags
      const filesToCreate = Object.entries(templateFilePaths).filter(([outputFileName, templateFileName]) => {
        if (outputFileName.startsWith('packages/eslint-config') && skipEslintConfig === 'true') return false;
        if (outputFileName.startsWith('packages/tsconfig') && skipTsConfig === 'true') return false;
        if (outputFileName.startsWith('apps/') && skipAppsFolder === 'true') return false;
        if (outputFileName.startsWith('.github/workflows') && skipGithubWorkflows === 'true') return false;
        if (outputFileName.startsWith('.changeset') && skipChangesets === 'true') return false; // Handled by changeset init
        return true;
      });

      // Compile and write files from templates
      for (const [outputFileName, templateFileName] of filesToCreate) {
        const templatePath = path.join(templatesDir, templateFileName);
        const templateContent = await fs.readFile(templatePath, 'utf8');
        const template = Handlebars.compile(templateContent);
        const compiledContent = template({
          projectName: name,
          projectDescription: description,
          projectScope: projectScope === '' ? undefined : projectScope, // Pass undefined if scope is empty string
          pulumiOrganization,
          pulumiProject,
          environments: environments.split(',').map((env: string) => env.trim()),
          pnpmVersion,
          nodeVersion,
        });
        
        const outputFilePath = path.join(projectDir, outputFileName);
        // Ensure parent directory exists for nested files like .github/workflows
        await fs.mkdir(path.dirname(outputFilePath), { recursive: true });
        await fs.writeFile(outputFilePath, compiledContent);
      }

      // Initialize Changesets if not skipped
      if (skipChangesets !== 'true') {
        console.log('Initializing Changesets...');
        await execa('pnpm', ['exec', 'changeset', 'init'], { cwd: projectDir, stdio: 'inherit' });

        // Modify Changeset config.json
        const changesetConfigPath = path.join(projectDir, '.changeset', 'config.json');
        const changesetConfig = JSON.parse(await fs.readFile(changesetConfigPath, 'utf8'));

        changesetConfig.changelog = ['@changesets/changelog-github', { repo: `${pulumiOrganization}/${pulumiProject}` }];
        changesetConfig.access = 'restricted'; // Assuming private packages
        changesetConfig.baseBranch = 'main'; // Assuming main branch
        changesetConfig.linked = true; // Assuming linked packages

        await fs.writeFile(changesetConfigPath, JSON.stringify(changesetConfig, null, 2));
        console.log('Changeset config updated.');
      }

      console.log(`Successfully bootstrapped project '${name}'!`);

      if (skipInstall !== 'true') {
        console.log('Running pnpm install...');
        await execa('pnpm', ['install'], { cwd: projectDir, stdio: 'inherit' });
        console.log('Dependencies installed.');
      } else {
        console.log('Skipping dependency installation.');
      }

    } catch (error: any) {
      console.error(`Failed to bootstrap project: ${error.message}`);
    }
  },
});