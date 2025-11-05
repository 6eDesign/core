import { $ } from 'zx/core';

interface PkgInfo {
	name: string;
	version: string;
	path: string;
	private: boolean;
}

export const workspaceService = Object.freeze({
	async getWorkspaces(): Promise<PkgInfo[]> {
		return JSON.parse((await $`pnpm --json ls --depth=-1`).stdout) as PkgInfo[];
	},
	async getWorkspace(name: string): Promise<PkgInfo | null> {
		const workspaces = await this.getWorkspaces();
		return workspaces.find((ws) => ws.name === name) || null;
	},
	async importFromWorkspace<T>(name: string, path: string): Promise<T> {
		const workspace = await this.getWorkspace(name);
		if (!workspace) {
			throw new Error(`Workspace not found: ${name}`);
		}
		return import(`${workspace.path}/${path}`) as Promise<T>;
	}
});
