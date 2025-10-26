import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    circuits: 'src/circuits.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  exports: true,
  external: [],
  platform: 'node',
});