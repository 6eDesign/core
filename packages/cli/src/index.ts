#!/usr/bin/env node

import { Command } from 'commander';
import { CommandBuilder } from './utils/command-builder';
import { commands } from './commands/definitions';
import { UiService } from './services/ui.service';

const program = new Command();

program.version('0.1.0').description('A CLI for the Stacker framework (test change)');

const commandBuilder = new CommandBuilder();
commandBuilder.build(program, commands);

// If no command is provided, prompt the user to select one
if (process.argv.length <= 2) {
	const uiService = new UiService();
	uiService.promptForCommand(commands).then((selectedCommandName) => {
		if (selectedCommandName) {
			// Re-parse arguments with the selected command
			program.parse([process.argv[0], process.argv[1], selectedCommandName]);
		} else {
			program.help();
		}
	});
} else {
	program.parseAsync(process.argv);
}
