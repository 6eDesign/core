# Stacker CLI: Technical Approach

## 1. Introduction

This document outlines the technical approach for building the Stacker CLI, a command-line interface for the Stacker ecosystem. It expands on the [Product Requirements Document (PRD)](./PRD.md) to provide a detailed architectural overview and a phased implementation plan.

The initial focus is to create a tool for manually testing deployment plugins, as specified in the PRD, by executing deployment commands defined in workspace-specific `deploy.config.mjs` files.

## 2. Core Architecture

The CLI is built in TypeScript and leverages a modular, **config-driven architecture** to define and execute commands. This design enhances testability, maintainability, and extensibility.

### Key Components:

*   **Command Definitions (`src/commands/definitions.ts`):** This is the central hub for defining all CLI commands and their options. Commands are declaratively defined using `CliCommandSchema` and `CliOptionSchema` (from `src/types/cli.ts`), which are Zod schemas. These definitions include command names, descriptions, options (with their types, whether they are required, and optional Inquirer.js prompt configurations for interactive mode), and a reference to the handler function that executes the command's logic.

*   **Command Builder (`src/utils/command-builder.ts`):** This utility is responsible for taking the declarative command definitions and dynamically registering them with the `commander.js` CLI framework. It iterates through the `CliCommandSchema` instances, adds commands and their options to `commander`, and sets up the action handlers. Crucially, it orchestrates the interactive "Genie Mode" by identifying missing required options and using the `UiService` to prompt the user based on the `prompt` metadata defined in the `CliOptionSchema`.

*   **UI Service (`src/services/ui.service.ts`):** This service provides a generalized interface for all user interactions. It wraps `inquirer` and is capable of dynamically generating and running prompts based on the `InquirerPromptSchema` defined in `src/types/cli.ts`. It centralizes UI logic, making it easier to manage interactive flows and ensuring a consistent user experience. **Future enhancements will focus on improving output formatting and potentially exploring more robust CLI frameworks for a richer user interface, especially for complex operations like Pulumi log output.**

*   **Workspace Service (`src/services/workspace.service.ts`):** Responsible for discovering and providing information about workspaces within the monorepo. It parses the root `pnpm-workspace.yaml` to find workspace paths.

*   **Config Service (`src/services/config.service.ts`):** Responsible for dynamically loading and parsing the `deploy.config.mjs` file for a given workspace. It uses dynamic `import()` to load the configuration and make it available to other services.

*   **Deployment Service (`src/services/deployment.service.ts`):** Orchestrates the execution of a deployment. It takes a workspace, a deployable name, and its parameters, then uses the Config Service to find the corresponding `deployHandler` and executes it. It also manages the `--dry-run` logic and interacts with Pulumi.

### Libraries:

*   **CLI Framework:** `commander`
*   **Schema Validation:** `zod`
*   **Interactive Prompts:** `inquirer`, `inquirer-autocomplete-prompt`
*   **Workspace Discovery:** `fast-glob`, `js-yaml`
*   **UI/Output:** `chalk` (colors), `ora` (spinners)
*   **Testing:** `vitest`

## 3. Command Execution Flow (Config-Driven)

This section describes the high-level flow of how commands are defined, processed, and executed in the new config-driven CLI architecture.

1.  **Command Definition:** All CLI commands are defined declaratively in `src/commands/definitions.ts` as instances of `CliCommandSchema`. Each command specifies its name, description, a list of `CliOptionSchema` objects (detailing command-line options, their types, and optional interactive prompt configurations), and a `handler` function containing the core business logic for that command.

2.  **Command Registration:** During CLI initialization (`src/index.ts`), the `CommandBuilder` reads these `CliCommandSchema` definitions. It then dynamically registers each command and its associated options with the `commander.js` library. This process automatically configures `commander` to understand the command-line arguments and options.

3.  **Option Collection and Interactive Prompting ("Genie Mode"):** When a command is executed, the `CommandBuilder`'s action handler first collects all options provided directly via the command line. It then iterates through the command's defined `CliOptionSchema`s. If a required option is missing (or if an option has a `prompt` configuration and is not provided), the `CommandBuilder` utilizes the `UiService` to dynamically generate and display an interactive prompt to the user. The type of prompt (e.g., input, list, autocomplete) and its message are derived directly from the `prompt` metadata within the `CliOptionSchema`.

4.  **Dynamic Choice Population:** For prompts like workspace or deployable selection, the `CommandBuilder` dynamically fetches available choices (e.g., by discovering workspaces or loading deployable configurations) and passes them to the `UiService` to populate the interactive prompt's options.

5.  **Handler Execution:** Once all necessary options (either provided via CLI arguments or collected through interactive prompts) have been gathered and validated, the `CommandBuilder` invokes the `handler` function associated with the executed command. The `handler` receives a consolidated object containing all the command's options, allowing it to perform its specific task (e.g., orchestrate a deployment). **The output of these handlers, especially for long-running operations like Pulumi deployments, will be a key area for future UI/UX improvements.**

This config-driven approach significantly streamlines the addition of new commands and features, as much of the boilerplate for argument parsing and interactive prompting is handled generically by the `CommandBuilder` and `UiService` based on the declarative definitions.

## 4. Out of Scope (Initial Version)

As per the PRD, the following are not part of the initial implementation:

*   Project generation (`stacker init`).
*   Advanced project management (`stacker deps`, `stacker config`, `stacker secrets`).
*   Persistent caching of workspace data.
