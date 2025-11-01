import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: {
		index: 'src/index.ts'
	},
	format: ['esm', 'cjs'],
	dts: true,
	exports: true,
	external: ['@pulumi/pulumi', '@pulumi/docker'],
	platform: 'node',
	ignoreWatch: ['.turbo/']
});
