import { defineConfig } from 'tsdown';

export default defineConfig({
  external: ['@pulumi/pulumi', '@pulumi/docker'],
  platform: 'node',
});
