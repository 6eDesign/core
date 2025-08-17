import * as fs from 'fs/promises';
import * as path from 'path';
import * as yaml from 'js-yaml';
import glob from 'fast-glob';

export interface Workspace {
  name: string;
  path: string;
}

export class WorkspaceService {
  private rootDir: string | null = null;

  private async findRepoRoot(): Promise<string> {
    if (this.rootDir) {
      return this.rootDir;
    }

    let currentDir = process.cwd();
    while (currentDir !== path.parse(currentDir).root) {
      const pnpmWorkspaceFile = path.join(currentDir, 'pnpm-workspace.yaml');
      try {
        await fs.access(pnpmWorkspaceFile);
        this.rootDir = currentDir;
        return this.rootDir;
      } catch (error) {
        // File not found, move up
      }
      currentDir = path.dirname(currentDir);
    }

    throw new Error('Could not find pnpm-workspace.yaml in any parent directory.');
  }

  public async discoverWorkspaces(): Promise<Workspace[]> {
    const root = await this.findRepoRoot();
    const pnpmWorkspacePath = path.join(root, 'pnpm-workspace.yaml');
    const fileContents = await fs.readFile(pnpmWorkspacePath, 'utf8');
    const workspaceConfig = yaml.load(fileContents) as { packages: string[] };

    const packageJsonFiles = await glob(workspaceConfig.packages.map(p => `${p}/package.json`), {
      cwd: root,
      absolute: true,
      ignore: ['**/node_modules/**'],
    });

    const workspaces = await Promise.all(
      packageJsonFiles.map(async (pkgPath: string) => {
        const pkgJsonContents = await fs.readFile(pkgPath, 'utf8');
        const pkgJson = JSON.parse(pkgJsonContents);
        return {
          name: pkgJson.name,
          path: path.dirname(pkgPath),
        };
      })
    );

    return workspaces;
  }

  public async discoverDeployableWorkspaces(): Promise<Workspace[]> {
    const allWorkspaces = await this.discoverWorkspaces();
    const deployableWorkspaces: Workspace[] = [];

    for (const workspace of allWorkspaces) {
      const deployConfigPath = path.join(workspace.path, 'deploy.config.mjs');
      try {
        await fs.access(deployConfigPath);
        deployableWorkspaces.push(workspace);
      } catch (error) {
        // deploy.config.mjs does not exist for this workspace
      }
    }
    return deployableWorkspaces;
  }
}
