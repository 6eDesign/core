import { defineCommand } from '../utils/defineCommand';
import { WorkspaceService } from '../services/workspace.service';

export const generateDocsEntryPointsCommand = defineCommand({
	name: 'generate-docs-entry-points',
	description: 'Generates a JSON array of entry points for typedoc',
	inputs: {},
	handler: async () => {
		const workspaceService = new WorkspaceService();
		const workspaces = await workspaceService.discoverWorkspaces();

		const entryPoints = workspaces
			.filter((workspace) => {
				const pkg = workspace.pkgJson;
				return pkg['6e']?.generateDocs !== false;
			})
			.map((workspace) => workspace.path);

		console.log(JSON.stringify(entryPoints));
	}
});
