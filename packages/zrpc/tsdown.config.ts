import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: {
		index: 'src/index.ts',
		router: 'src/router.ts',
		client: 'src/client.ts',
		'messenger-client': 'src/messenger-client.ts',
		zod: 'src/zod.ts'
	},
	sourcemap: true,
	external: [],
	platform: 'node',
	format: ['esm', 'cjs'],
	dts: true,
	splitting: false,
	exports: true
});
