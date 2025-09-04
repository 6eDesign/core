/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
	$schema: 'https://typedoc.org/schema.json',
	entryPointStrategy: 'packages',
	entryPoints: ['../../packages/zrpc'],
	// exclude: ['../../packages/cicd', '../../packages/cli', '../../packages/microservice'],
	excludePrivate: true,
	excludeProtected: true,
	excludeInternal: true,
	hideGenerator: true,
	plugin: ['typedoc-plugin-markdown'],
	out: 'static/api-docs',
	readme: 'none',
	skipErrorChecking: true,
	useCodeBlocks: true,
	useHTMLEncodedBrackets: true,
	hostedBaseUrl: 'http://localhost:5173/api/',
	useHostedBaseUrlForAbsoluteLinks: true
};

export default config;
