# @6edesign/cli

This package provides the Command Line Interface (CLI) for the Stacker monorepo. It allows developers to interact with various aspects of the Stacker ecosystem, including deploying applications, managing workspaces, and eventually debugging and code generation.

The CLI is built with a **config-driven architecture**, making it highly extensible and easy to add new commands and interactive features.

## Features

*   **Config-Driven Commands:** Commands and their options are defined declaratively using Zod schemas, simplifying development and ensuring consistency.
*   **Interactive "Genie Mode":** Automatically prompts users for missing required options, guiding them through complex operations with clear, interactive prompts.
*   **One-Shot Mode:** Supports direct command-line arguments for experienced users and automated CI/CD workflows.
*   **Workspace Management:** Discovers and interacts with workspaces defined in the monorepo.
*   **Deployment Orchestration:** Integrates with `@6edesign/cicd` to execute deployments using Pulumi.

## Installation

The Stacker CLI is part of the Stacker monorepo. To use it, ensure you have `pnpm` installed and then run:

```bash
pnpm install
```

## Usage

You can execute the Stacker CLI using `pnpm exec stacker`.

### Interactive Mode (Genie Mode)

Run the CLI without any arguments to enter interactive mode:

```bash
pnpm exec stacker
```

The CLI will guide you through available commands and their options using prompts.

### One-Shot Mode

Specify commands and options directly on the command line:

```bash
pnpm exec stacker deploy --workspace=shop --deployable=ui --environment=dev
```

### Example: Deploying an Application

To deploy an application, you can use the `deploy` command.

#### Interactive Deployment

```bash
pnpm exec stacker deploy
```

Follow the prompts to select the workspace, deployable, and environment.

#### One-Shot Deployment

```bash
pnpm exec stacker deploy --workspace=my-app --deployable=dockerImage --environment=prod --version=1.0.0
```

## Development

To add new commands or extend existing ones:

1.  Define your command and its options in `packages/cli/src/commands/definitions.ts` using `CliCommandSchema` and `CliOptionSchema`.
2.  Implement the command's logic in its associated handler function.
3.  The `CommandBuilder` will automatically register your new command with the CLI.

Refer to `packages/cli/src/types/cli.ts` for the schema definitions and `packages/cli/src/utils/command-builder.ts` for how commands are built and interactive prompts are handled.
