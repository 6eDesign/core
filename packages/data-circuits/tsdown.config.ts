import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: {
		index: './index.js',
		circuits: './lib/circuits.js'
	},
	format: ['esm', 'cjs']
});
