import { z } from 'zod';
import { defineCommand } from '../utils/defineCommand';
import { promises as fs } from 'fs';
import path from 'path';
import { UiService } from '../services/ui.service';

const ui = new UiService();

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
    'src/index.ts': () => `console.log('Hello from new package!');
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
  },
  handler: async (input) => {
    const { name, description } = input;
    const packageDir = path.join(process.cwd(), 'packages', name);

    ui.spinner.start(`Creating new package '${name}' at ${packageDir}...`);

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
      ];

      for (const fileName of filesToCreate) {
        const content = getTemplate(fileName, { name, description });
        await fs.writeFile(path.join(packageDir, fileName), content);
      }

      ui.spinner.succeed(`Successfully created package '${name}'!`);
      ui.print(`Next steps:
1. Run 'pnpm install' to link the new package.
2. Start developing in 'packages/${name}/src/index.ts'`);

    } catch (error: any) {
      ui.spinner.fail(`Failed to create package: ${error.message}`);
    }
  },
});