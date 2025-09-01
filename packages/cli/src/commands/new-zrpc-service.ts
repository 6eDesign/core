import { z } from 'zod';
import { defineCommand } from '../utils/defineCommand';
import path from 'path';
import { execa } from 'execa';
import { fileURLToPath } from 'url';
import { Generator } from '../utils/generator';

export const newZRPCServiceCommand = defineCommand({
	name: 'new-zrpc-service',
	description: 'Create a new zRPC microservice',
	inputs: {
		name: {
			schema: z.string(),
			description: 'The full name of the new zRPC service (e.g., @scope/my-service or my-service)',
			promptConfig: {
				type: 'input',
				message: 'Enter the full service name:'
			}
		},
		type: {
			schema: z.enum(['js', 'ts']),
			description: 'The type of the service (JavaScript or TypeScript)',
			promptConfig: {
				type: 'list',
				message: 'Select the service type:',
				choices: ['js', 'ts']
			}
		},
		port: {
			schema: z.string().transform((val) => parseInt(val, 10)),
			description: 'The port for the service to listen on (e.g., 4000)',
			promptConfig: {
				type: 'input',
				message: 'Enter the port for the service:',
				default: '4000'
			}
		},
		skipInstall: {
			schema: z.string().optional(),
			description: "Skip the automatic 'pnpm install' step by passing 'true'."
		}
	},
	handler: async (input) => {
		const { name: fullServiceName, type, port, skipInstall } = input;

		let projectScope: string | undefined;
		let serviceName: string;

		const scopeMatch = fullServiceName.match(/^@([^/]+)\/(.*)$/);
		if (scopeMatch) {
			projectScope = scopeMatch[1];
			serviceName = scopeMatch[2];
		} else {
			serviceName = fullServiceName;
		}

		const currentDir = path.dirname(fileURLToPath(import.meta.url));
		const templatesDir = path.join(currentDir, `../templates/new-zrpc-service/${type}`);
		const targetDir = path.join(process.cwd(), 'apps', serviceName);

		console.log(`Creating new zRPC service '${fullServiceName}' at ${targetDir}...`);

		try {
			let templateFilePaths: { [key: string]: string };

			if (type === 'js') {
				templateFilePaths = {
					'package.json': 'package.json.hbs',
					'index.js': 'index.js.hbs',
					'routes.js': 'routes.js.hbs',
					'sdk.js': 'sdk.js.hbs'
				};
			} else {
				// type === 'ts'
				templateFilePaths = {
					'package.json': 'package.json.hbs',
					'tsconfig.json': 'tsconfig.json.hbs',
					'src/index.ts': 'src/index.ts.hbs',
					'src/routes.ts': 'src/routes.ts.hbs',
					'src/sdk.ts': 'src/sdk.ts.hbs',
					'tsdown.config.ts': 'tsdown.config.ts.hbs'
				};
			}

			const generator = new Generator(templatesDir, targetDir);
			const data = {
				fullServiceName,
				serviceName,
				projectScope:
					projectScope === undefined ? '6edesign' : projectScope === '' ? undefined : projectScope,
				port: port
			};

			await generator.run(templateFilePaths, data, type === 'ts' ? ['src'] : []);

			console.log(`Successfully created zRPC service '${fullServiceName}'!`);

			if (skipInstall !== 'true') {
				console.log('Running pnpm install...');
				await execa('pnpm', ['install'], { cwd: process.cwd(), stdio: 'inherit' });
				console.log('Dependencies installed.');

				console.log('Adding @6edesign/zrpc@latest to the new service...');
				await execa('pnpm', ['add', '@6edesign/zrpc@latest'], { cwd: targetDir, stdio: 'inherit' });
				console.log('@6edesign/zrpc@latest added.');
			} else {
				console.log('Skipping dependency installation.');
			}
		} catch (error: any) {
			console.error(`Failed to create zRPC service: ${error.message}`);
		}
	}
});
