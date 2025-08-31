import { z } from 'zod';
import { defineCommand } from '../utils/defineCommand';
import { promises as fs } from 'fs';
import path from 'path';
import { execa } from 'execa';
import Handlebars from 'handlebars';
import { fileURLToPath } from 'url';

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
      // Check if directory exists and is not empty
      try {
        const stats = await fs.stat(packageDir);
        if (stats.isDirectory()) {
          const files = await fs.readdir(packageDir);
          if (files.length > 0) {
            throw new Error(`Target directory '${packageDir}' is not empty. Aborting to prevent accidental overwrite.`);
          }
        }
      } catch (error: any) {
        if (error.code !== 'ENOENT') { // Ignore if directory simply doesn't exist
          throw error;
        }
      }

      // Create directories
      await fs.mkdir(packageDir, { recursive: true });
      await fs.mkdir(path.join(packageDir, 'src'), { recursive: true });
      await fs.mkdir(path.join(packageDir, 'test'), { recursive: true });

      // Compile and write files from templates
      for (const [outputFileName, templateFileName] of Object.entries(templateFilePaths)) {
        const templatePath = path.join(templatesDir, templateFileName);
        const templateContent = await fs.readFile(templatePath, 'utf8');
        const template = Handlebars.compile(templateContent);
        const compiledContent = template({ fullPackageName, packageName, scope, description });
        
        const outputFilePath = path.join(packageDir, outputFileName);
        await fs.writeFile(outputFilePath, compiledContent);
      }

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