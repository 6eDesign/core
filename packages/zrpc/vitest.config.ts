import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    // Ensure ESM compatibility if needed, e.g., by configuring Vite's resolver
    // or ensuring tsconfig.json targets esnext modules.
  },
});