import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: {
		index: 'src/index.ts',
		router: 'src/router.ts',
		client: 'src/client.ts',
		'messenger-client': 'src/messageClient.ts',
		zod: 'src/zod.ts'
	},
	external: [],
	platform: 'node',
	format: ['esm', 'cjs'],
	dts: true,
	splitting: false,
	exports: true
});
