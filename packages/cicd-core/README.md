# @6edesign/cicd-core

This package provides the foundational utilities and types for building CI/CD plugins within the Stacker monorepo. It defines the core `createPlugin` function and common Zod schemas used across various deployment plugins.

## Features

*   **`createPlugin` Function:** A utility function to easily define new CI/CD plugins with input schemas, required secrets, and a `deployHandler`.
*   **Core Zod Schemas:** Reusable Zod schemas for common plugin configurations and data validation.
*   **Plugin Types:** TypeScript type definitions for various plugin components.

## Usage

This package is primarily consumed by other CI/CD-related packages, such as `@6edesign/cicd`, to build specific deployable plugins. Developers extending the CI/CD capabilities will use `createPlugin` to define new deployment logic.

### Example `createPlugin` Usage

```typescript
// Example of how createPlugin is used in other packages
import { createPlugin, z } from '@6edesign/cicd-core';

export const examplePlugin = createPlugin({
  // Define the input schema for this plugin using Zod
  input: z.object({
    message: z.string().describe('A message to display.'),
    count: z.number().optional().describe('Number of times to display the message.'),
  }),
  // Declare any secrets required by this plugin
  requiredSecrets: ['API_KEY'],
  // The core logic for this plugin
  deployHandler: async (config, context) => {
    const { message, count = 1 } = config;
    for (let i = 0; i < count; i++) {
      console.log(`[${context.dryRun ? 'DRY RUN' : 'EXEC'}] ${message}`);
    }
    // Return any outputs from the deployment
    return { status: 'completed' };
  },
});
```

## Development

When creating new CI/CD plugins, import `createPlugin` and `z` from this package. Define your plugin's input schema, required secrets, and `deployHandler` using the provided utilities.
