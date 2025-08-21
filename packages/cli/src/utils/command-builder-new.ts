import { Command } from 'commander';
import { z } from 'zod';
import { UiService } from '../services/ui.service';
import { createSchema } from './defineCommand';

export class NewCommandBuilder {
  private uiService: UiService;

  constructor() {
    this.uiService = new UiService();
  }

  public build(program: Command, commands: any[]) {
    commands.forEach(cmd => this.addCommand(program, cmd));
  }

  private addCommand(parentCommand: Command, commandDef: any) {
    const command = parentCommand.command(commandDef.name).description(commandDef.description);

    for (const key in commandDef.inputs) {
      const input = commandDef.inputs[key];
      const flags = `--${key} <value>`; // Construct the flags string
      command.option(flags, input.description);
    }

    command.action(async (...args: any[]) => {
      const options = command.opts();
      const schema = createSchema(commandDef.inputs);
      let collectedOptions: { [key: string]: any } = { ...options };

      for (const key in commandDef.inputs) {
        const input = commandDef.inputs[key];
        if (collectedOptions[key] === undefined && input.promptConfig) {
          const promptConfig = { ...input.promptConfig, name: key };

          if (typeof promptConfig.source === 'function') {
            // Bind the source function to pass collectedOptions as the first argument
            // Inquirer's autocomplete source function expects (answersSoFar, input)
            // We are passing collectedOptions as answersSoFar
            promptConfig.source = promptConfig.source.bind(null, collectedOptions);
          }

          const answers = await this.uiService.prompt([promptConfig]);
          Object.assign(collectedOptions, answers);
        }
      }

      try {
        const finalOptions = schema.parse(collectedOptions);
        await commandDef.handler(finalOptions);
      } catch (error) {
        console.error('Error executing command after prompting:', error);
      }
    });
  }
}