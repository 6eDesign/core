import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'node',
  },
  resolve: {
    alias: {
      '@6edesign/cicd-core': path.resolve(__dirname, '../../packages/cicd-core/src'),
      '@6edesign/cicd': path.resolve(__dirname, '../../packages/cicd/src'),
      '@6edesign/cli/src': path.resolve(__dirname, './src'),
    },
  },
});