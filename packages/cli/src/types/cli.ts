import { z } from 'zod';
import { Command } from 'commander';

// Define the Zod schema for Inquirer.js prompt options
export const InquirerPromptSchema = z.object({
	type: z.enum([
		'input',
		'number',
		'confirm',
		'list',
		'rawlist',
		'expand',
		'checkbox',
		'password',
		'editor',
		'autocomplete'
	]),
	message: z.string(),
	choices: z
		.array(z.union([z.string(), z.object({ name: z.string(), value: z.any() })]))
		.optional(),
	default: z.any().optional(),
	validate: z.function(z.tuple([z.any()]), z.union([z.boolean(), z.string()])).optional(),
	when: z.function(z.tuple([z.record(z.string(), z.any())]), z.boolean()).optional()
	// Add other Inquirer.js options as needed
});

// Define the Zod schema for a CLI option
export const CliOptionSchema = z.object({
	name: z.string().describe(`The name of the option (e.g., '--workspace', '-d, --debug').`),
	description: z.string().describe('A brief description of the option.'),
	type: z
		.enum(['string', 'boolean', 'number', 'array', 'object'])
		.describe('The expected type of the option value.'),
	required: z.boolean().default(false).describe('Whether the option is required.'),
	defaultValue: z.any().optional().describe('The default value for the option if not provided.'),
	prompt: InquirerPromptSchema.optional().describe(
		'Inquirer.js prompt configuration for interactive mode.'
	),
	// For options that can be specified multiple times (e.g., --arg key=value)
	variadic: z
		.boolean()
		.default(false)
		.describe('Whether the option can be specified multiple times.'),
	// For options that require custom parsing (e.g., --arg key=value)
	parser: z
		.function(z.tuple([z.string(), z.any()]), z.any())
		.optional()
		.describe('A custom parser function for the option value.')
});

// Define the Zod schema for a CLI command (recursive)
export const CliCommandSchema = z.object({
	name: z.string().describe(`The name of the command (e.g., 'deploy', 'generate').`),
	description: z.string().describe('A brief description of the command.'),
	options: z.array(CliOptionSchema).default([]).describe('Options for this command.'),
	handler: z
		.function(z.tuple([z.record(z.string(), z.any()), z.any()]), z.promise(z.void()))
		.describe('The function to execute when the command is run.'),
	subcommands: z
		.array(z.lazy(() => CliCommandSchema))
		.default([])
		.describe('Nested subcommands.')
	// This will be for more complex branching logic in Genie Mode
	// For now, we'll keep it simple and prompt for missing required options.
	// In the future, this could be a more sophisticated state machine or flow definition.
	// promptFlow: z.any().optional(),
});

export type CliOption = z.infer<typeof CliOptionSchema>;
export type CliCommand = z.infer<typeof CliCommandSchema>;
