# @6edesign/cicd

This package provides the core Continuous Integration/Continuous Deployment (CI/CD) functionalities for the Stacker monorepo. It defines the framework for creating deployable plugins and orchestrating deployments using Pulumi.

## Features

*   **Deployable Plugin Framework:** Defines interfaces and utilities for building custom deployable plugins (e.g., `dockerImagePlugin`).
*   **Pulumi Integration:** Facilitates the use of Pulumi for infrastructure as code (IaC) within deployment processes.
*   **Deployment Context:** Provides a standardized context object to deploy handlers, including dry-run capabilities and secret management.

## Usage

Deployable plugins are defined within this package and consumed by the `@6edesign/cli` for executing deployments.

### Example Deployable Plugin (Conceptual)

```typescript
// Example of a deployable plugin definition
import { createPlugin, z } from '@6edesign/cicd-core';
import * as pulumi from '@pulumi/pulumi';
import * as docker from '@pulumi/docker';

export const myDeployablePlugin = createPlugin({
  input: z.object({
    imageName: z.string(),
    tag: z.string(),
  }),
  requiredSecrets: ['DOCKER_USERNAME', 'DOCKER_PASSWORD'],
  deployHandler: async (config, context) => {
    // Pulumi logic to deploy a Docker image
    const image = new docker.Image('my-image', {
      imageName: `${config.imageName}:${config.tag}`,
      build: {
        context: './app',
      },
    });

    if (!context.dryRun) {
      // Actual deployment logic
      pulumi.log.info(`Deploying image: ${image.imageName}`);
    } else {
      pulumi.log.info(`[DRY RUN] Would deploy image: ${image.imageName}`);
    }

    return {
      imageUrl: image.imageName,
    };
  },
});
```

## Development

To add new deployable plugins or extend existing CI/CD functionalities, refer to the `src/plugins` directory and the `@6edesign/cicd-core` package for foundational utilities.
