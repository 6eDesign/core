import { defineConfig } from 'tsdown';

export default defineConfig({
  external: ['@pulumi/pulumi'],
  platform: 'node',
});
