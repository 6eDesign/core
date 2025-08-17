import * as path from 'path';

export class ConfigService {
  public async loadConfig(workspacePath: string): Promise<{ config: any; engine: any }> {
    const configPath = path.join(workspacePath, 'deploy.config.mjs');
    try {
      const configModule = await import(configPath);
      // Assuming the config is the default export, which now contains { config, engine }
      return configModule.default;
    } catch (error) {
      console.error(`Error loading config from ${configPath}:`, error);
      throw new Error(`Could not load or parse the deploy.config.mjs for the specified workspace.`);
    }
  }
}