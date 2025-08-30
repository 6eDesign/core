import { z } from 'zod';

export function createSchema<T extends Record<string, { schema: z.ZodSchema }>>(
	config: T
): z.ZodObject<{ [K in keyof T]: T[K]['schema'] }> {
	return z.object(
		Object.fromEntries(Object.entries(config).map(([k, v]) => [k, v.schema])) as {
			[K in keyof T]: T[K]['schema'];
		}
	);
}

export function defineCommand<T extends Record<string, { schema: z.ZodSchema }>>(command: {
	name: string;
	description: string;
	inputs: T;
	handler: (input: z.infer<z.ZodObject<{ [K in keyof T]: T[K]['schema'] }>>) => Promise<void>;
}) {
	return command;
}
