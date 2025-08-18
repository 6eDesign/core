import * as path from 'path';

export class ConfigService {
	public async loadConfig(
		projectRoot: string,
		workspacePath: string
	): Promise<{ projectConfig: any; workspaceConfig: any; engine: any }> {
		const projectConfigPath = path.join(projectRoot, 'deploy.config.mjs');
		const workspaceConfigPath = path.join(workspacePath, 'deploy.config.mjs');

		try {
			const [{ default: projectConfig }, { default: workspaceConfig }] = await Promise.all([
				import(projectConfigPath),
				import(workspaceConfigPath)
			]);

			return { projectConfig, workspaceConfig, engine: workspaceConfig.engine };
		} catch (error) {
			console.error(`Error loading config:`, error);
			throw new Error(`Could not load or parse a deploy.config.mjs file.`);
		}
	}
}
