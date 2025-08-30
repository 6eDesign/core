import { z } from 'zod';
import { defineCommand } from '../utils/defineCommand';
import { promises as fs } from 'fs';
import path from 'path';
import { execa } from 'execa';

const getTemplate = (templateName: string, vars: Record<string, string>) => {
  const templates: Record<string, (vars: Record<string, string>) => string> = {
    'package.json': ({ name, description }) => `{
  "name": "@6edesign/${name}",
  "version": "0.0.0",
  "description": "${description}",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "publishConfig": {
    "access": "public"
  },
  "scripts": {
    "dev": "tsdown --watch src/index.ts",
    "build": "tsdown src/index.ts",
    "test": "vitest run --dir test",
    "check-types": "tsc --noEmit"
  },
  "devDependencies": {
    "@6edesign/tsconfig": "workspace:^",
    "tsdown": "^0.13.0",
    "typescript": "^5.4.5",
    "vitest": "^1.6.0"
  }
}`,
    'tsconfig.json': () => `{
  "extends": "@6edesign/tsconfig/node.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}`,
    'tsdown.config.ts': () => `import { defineConfig } from 'tsdown';

export default defineConfig({
  external: [],
  platform: 'node',
});
`,
    'vitest.config.ts': () => `import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
  },
});
`,
    'README.md': ({ name }) => `# ${name}

> ${name} package
`,
    'src/index.ts': () => `/**
 * Adds two numbers.
 * @param a - The first number.
 * @param b - The second number.
 * @returns The sum of the two numbers.
 */
export const add = (a: number, b: number): number => a + b;
`,
    'test/index.test.ts': () => `import { describe, it, expect } from 'vitest';
import { add } from '../src';

describe('add', () => {
  it('should add two numbers', () => {
    expect(add(1, 2)).toBe(3);
  });
});
`,
  };
  return templates[templateName](vars);
}

export const newPackageCommand = defineCommand({
  name: 'new-package',
  description: 'Create a new typescript package in the packages directory',
  inputs: {
    name: {
      schema: z.string(),
      description: 'The name of the new package (e.g., zrpc)',
      promptConfig: {
        type: 'input',
        message: 'Enter the new package name:',
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
    const { name, description } = input;
    const packageDir = path.join(process.cwd(), 'packages', name);

    console.log(`Creating new package '${name}' at ${packageDir}...`);

    try {
      // Create directories
      await fs.mkdir(packageDir, { recursive: true });
      await fs.mkdir(path.join(packageDir, 'src'), { recursive: true });
      await fs.mkdir(path.join(packageDir, 'test'), { recursive: true });

      // Create files from templates
      const filesToCreate = [
        'package.json',
        'tsconfig.json',
        'tsdown.config.ts',
        'vitest.config.ts',
        'README.md',
        'src/index.ts',
        'test/index.test.ts',
      ];

      for (const fileName of filesToCreate) {
        const content = getTemplate(fileName, { name, description });
        await fs.writeFile(path.join(packageDir, fileName), content);
      }

      console.log(`Successfully created package '${name}'!`);

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