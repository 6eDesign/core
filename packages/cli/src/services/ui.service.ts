import inquirer from 'inquirer';
import { z } from 'zod';
import { CliCommand, InquirerPromptSchema } from '../types/cli';
import AutocompletePrompt from 'inquirer-autocomplete-prompt';

inquirer.registerPrompt('autocomplete', AutocompletePrompt);

export class UiService {
  public async promptForWorkspace(workspaces: { name: string; path: string }[]): Promise<string> {
    const { workspace } = await inquirer.prompt([
      {
        type: 'list',
        name: 'workspace',
        message: 'Select a workspace:',
        choices: workspaces.map(w => ({ name: w.name, value: w.name })),
      },
    ]);
    return workspace;
  }

  public async promptForDeployable(deployables: any[]): Promise<string> {
    const { deployable } = await inquirer.prompt([
      {
        type: 'list',
        name: 'deployable',
        message: 'Select a deployable:',
        choices: deployables.map(d => ({ name: d.name, value: d.name })),
      },
    ]);
    return deployable;
  }

  public async promptForEnvironment(): Promise<string> {
    const { environment } = await inquirer.prompt([
      {
        type: 'list',
        name: 'environment',
        message: 'Select the deployment environment:',
        choices: ['dev', 'staging', 'prod'],
      },
    ]);
    return environment;
  }

  public async promptForCommand(commands: CliCommand[]): Promise<string> {
    const { command } = await inquirer.prompt([
      {
        type: 'list',
        name: 'command',
        message: 'Select a command:',
        choices: commands.map(cmd => ({ name: `${cmd.name} - ${cmd.description}`, value: cmd.name })),
      },
    ]);
    return command;
  }

  public async prompt<T>(questions: (z.infer<typeof InquirerPromptSchema> & { name: string })[]): Promise<T> {
    const processedQuestions = questions.map(options => {
      const promptOptions = { ...options };
      if (promptOptions.type === 'autocomplete' && typeof promptOptions.source === 'function') {
        delete promptOptions.choices;
      }
      return promptOptions;
    });

    const answers = await inquirer.prompt(processedQuestions);
    return answers as T;
  }

  public async promptForParameters(schema: z.ZodObject<any, any, any>): Promise<any> {
    const params: any = {};
    const shape = schema.shape;

    for (const key in shape) {
      const fieldSchema = shape[key];
      const description = fieldSchema.description || key;

      if (fieldSchema instanceof z.ZodString) {
        const { value } = await inquirer.prompt([{
          type: 'input',
          name: 'value',
          message: `Enter value for ${key}:`,
          description,
        }]);
        params[key] = value;
      } else if (fieldSchema instanceof z.ZodBoolean) {
        const { value } = await inquirer.prompt([{
          type: 'confirm',
          name: 'value',
          message: `Enable ${key}?`,
          description,
        }]);
        params[key] = value;
      } else if (fieldSchema instanceof z.ZodEnum) {
        const { value } = await inquirer.prompt([{
          type: 'list',
          name: 'value',
          message: `Select a value for ${key}`,
          choices: fieldSchema.options,
          description,
        }]);
        params[key] = value;
      } else if (fieldSchema instanceof z.ZodRecord) {
        console.log(`Enter key-value pairs for ${key}. Press enter with an empty key to finish.`);
        const record: Record<string, string> = {};
        while (true) {
          const { key: recordKey } = await inquirer.prompt([{
            type: 'input',
            name: 'key',
            message: 'Enter key:',
          }]);

          if (!recordKey) {
            break;
          }

          const { value: recordValue } = await inquirer.prompt([{
            type: 'input',
            name: 'value',
            message: `Enter value for ${recordKey}`,
          }]);
          record[recordKey] = recordValue;
        }
        params[key] = record;
      }
    }

    return params;
  }
}
