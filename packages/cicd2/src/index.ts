/**
 * @module cicd2
 * 
 * A type-safe deployment orchestration engine with a builder API for defining
 * deployables, dependencies, and output references across monorepo workspaces.
 */

// Main API
export { Engine } from './engine.js';
export { createPlugin } from './plugin.js';
export { createSecretProvider, z } from './types.js';
export { WorkspaceBuilder, DeployableEntry, OutputReference } from './workspace-builder.js';
export { workspaceService } from './workspace-service.js';

// Types
export type {
	RequiredSecrets,
	ISecretProvider,
	DeployOptions,
	DeployablePlugin,
	PluginMap,
	Simplify,
	OutputKeys
} from './types.js';
