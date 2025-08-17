import { defineConfig } from 'tsdown';

export default defineConfig({
  entries: ['src/index.ts'],
  format: 'esm',
});
