import { createCicdEngine, CicdEngine } from '@6edesign/cicd-core';
import { dockerImagePlugin } from './plugins/dockerImage';

const plugins = {
	dockerImage: dockerImagePlugin
};

const cicd: CicdEngine<typeof plugins> = createCicdEngine({
	plugins
});

export default cicd;