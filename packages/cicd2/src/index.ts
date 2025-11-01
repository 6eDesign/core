import { createCicdEngine, CicdEngine } from './engine';
import { dockerImagePlugin } from './plugins/dockerImage';

const plugins = {
	dockerImage: dockerImagePlugin
};

const baseCicd: CicdEngine<typeof plugins> = createCicdEngine({
	plugins
});

export default baseCicd;

export * from './plugins/dockerImage';
export * from './engine';

// Re-export the types from the engine
export type { DeployablePlugin, CicdEngine as StackerCICDEngine } from './engine';
