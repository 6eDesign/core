import { z } from 'zod';
import { InquirerPromptSchema } from '../types/cli';

export function createSchema<T extends Record<string, { schema: z.ZodSchema }>>(
	config: T
): z.ZodObject<{ [K in keyof T]: T[K]['schema'] }> {
	return z.object(
		Object.fromEntries(Object.entries(config).map(([k, v]) => [k, v.schema])) as {
			[K in keyof T]: T[K]['schema'];
		}
	);
}

type InputsConfig = Record<
	string,
	{ schema: z.ZodSchema; promptConfig?: z.infer<typeof InquirerPromptSchema> }
>;

type CommandHandler<T extends InputsConfig> = (
	input: z.infer<z.ZodObject<{ [K in keyof T]: T[K]['schema'] }>>
) => Promise<void>;

interface BaseCommand<T extends InputsConfig> {
	name: string;
	description: string;
	inputs?: T;
}

interface TypicalCommand<T extends InputsConfig> extends BaseCommand<T> {
	handler: CommandHandler<T>;
}

type Command<T extends InputsConfig> = TypicalCommand<T>;

export function defineCommand<T extends InputsConfig>(command: Command<T>) {
	return command;
}
