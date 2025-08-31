import { z } from 'zod';
import { defineCommand } from '../utils/defineCommand';
import path from 'path';
import { execa } from 'execa';
import { fileURLToPath } from 'url';
import { Generator } from '../utils/generator';

const templateFilePaths = {
  'package.json': 'package.json.hbs',
  'tsconfig.json': 'tsconfig.json.hbs',
  'tsdown.config.ts': 'tsdown.config.ts.hbs',
  'vitest.config.ts': 'vitest.config.ts.hbs',
  'README.md': 'README.md.hbs',
  'src/index.ts': 'src/index.ts.hbs',
  'test/index.test.ts': 'test/index.test.ts.hbs',
};

export const newPackageCommand = defineCommand({
  name: 'new-package',
  description: 'Create a new typescript package in the packages directory',
  inputs: {
    name: {
      schema: z.string(),
      description: 'The full name of the new package (e.g., @scope/my-package or my-package)',
      promptConfig: {
        type: 'input',
        message: 'Enter the full package name:',
      },
    },
    description: {
      schema: z.string(),
      description: 'A short description for the package.json',
      promptConfig: {
        type: 'input',
        message: 'Enter the package description:',
      },
    },
    skipInstall: {
      schema: z.string().optional(),
      description: "Skip the automatic 'pnpm install' step by passing 'true'.",
    },
  },
  handler: async (input) => {
    const { name: fullPackageName, description } = input;

    let scope: string | undefined;
    let packageName: string;

    const scopeMatch = fullPackageName.match(/^@([^/]+)\/(.*)$/);
    if (scopeMatch) {
      scope = scopeMatch[1];
      packageName = scopeMatch[2];
    } else {
      packageName = fullPackageName;
    }

    const packageDir = path.join(process.cwd(), 'packages', packageName);
    const currentDir = path.dirname(fileURLToPath(import.meta.url));
    const templatesDir = path.join(currentDir, '../templates/new-package');

    console.log(`Creating new package '${fullPackageName}' at ${packageDir}...`);

    try {
      const generator = new Generator(templatesDir, packageDir);
      await generator.run(
        templateFilePaths,
        { fullPackageName, packageName, scope, description },
        ['src', 'test']
      );

      console.log(`Successfully created package '${fullPackageName}'!`);

      if (input.skipInstall !== 'true') {
        console.log('Running pnpm install...');
        await execa('pnpm', ['install'], { stdio: 'inherit' });
        console.log('Dependencies installed.');
      } else {
        console.log('Skipping dependency installation.');
      }

    } catch (error: any) {
      console.error(`Failed to create package: ${error.message}`);
    }
  },
});
