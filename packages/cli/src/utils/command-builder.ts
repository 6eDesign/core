import { Command } from 'commander';
import { CliCommand, CliOption } from '../types/cli';
import { UiService } from '../services/ui.service';
import { WorkspaceService } from '../services/workspace.service';
import { ConfigService } from '../services/config.service';

export class CommandBuilder {
  private uiService: UiService;
  private workspaceService: WorkspaceService;
  private configService: ConfigService;

  constructor() {
    this.uiService = new UiService();
    this.workspaceService = new WorkspaceService();
    this.configService = new ConfigService();
  }

  public build(program: Command, commands: CliCommand[]) {
    commands.forEach(cmd => this.addCommand(program, cmd));
  }

  private addCommand(parentCommand: Command, cliCommand: CliCommand) {
    const command = parentCommand.command(cliCommand.name).description(cliCommand.description);

    cliCommand.options.forEach(option => {
      command.option(option.name, option.description, option.required ? true : false);
    });

    command.action(async (...args: any[]) => {
      const options = command.opts(); // Get parsed options directly from commander.js

      let collectedOptions: { [key: string]: any } = { ...options };

      // Manually parse variadic 'arg' option
      if (Array.isArray(collectedOptions.arg)) {
        const parsedArgs: { [key: string]: string } = {};
        collectedOptions.arg.forEach((arg: string) => {
          const [key, val] = arg.split('=');
          parsedArgs[key] = val;
        });
        collectedOptions.arg = parsedArgs;
      }

      for (const option of cliCommand.options) {
        const optionName = option.name.replace(/^--/, '').split(' ')[0];
        const camelCasedOptionName = optionName.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

        if (option.required && collectedOptions[camelCasedOptionName] === undefined && option.prompt) {
          const answer = await this.uiService.prompt({ ...option.prompt, name: optionName });
          collectedOptions[optionName] = answer;
        }
      }

      // Call the handler with the collected options
      try {
        await cliCommand.handler(collectedOptions, command); // Pass the commander command instance
      } catch (error) {
        console.error(`Error executing command ${cliCommand.name}:`, error);
      }
    });

    (cliCommand.subcommands || []).forEach(subCmd => this.addCommand(command, subCmd));
  }
}
