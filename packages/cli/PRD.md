# Stacker CLI: Product Requirements Document (PRD)

## 1. Introduction

The Stacker CLI is envisioned as a powerful and intuitive command-line interface designed to streamline the development, management, and deployment of projects within the Stacker monorepo ecosystem. It aims to abstract away underlying complexities, providing developers with a unified and delightful experience for various software engineering tasks.

Initially, the CLI will focus on facilitating the manual testing of deployment plugins, specifically the `dockerImagePlugin`, by enabling the execution of workspace-specific deployment commands.

## 2. Goals

- **Primary Goal (Immediate):** Enable manual testing of deployment plugins (e.g., `dockerImagePlugin`) by executing workspace-specific deployment commands via the CLI.
- **Secondary Goals (Future):**
  - **Project Generation:** Scaffold new Stacker monorepos and individual workspaces.
  - **Project Management:** Interact with Stacker projects (e.g., adding new workspaces, updating dependencies, managing configurations and secrets).
  - **Deployment Orchestration:** Facilitate deployments within our shared GitHub Actions workflow.
  - **Enhanced Developer Experience:** Provide a "delightful" user experience through intuitive interfaces, smart suggestions, and clear feedback.

## 3. User Roles

- **Developer:** The primary user, interacting with the CLI for daily development tasks, testing, and deployment.
- **CI/CD Engineer:** Utilizes the CLI in its "one-shot" mode within automated workflows (e.g., GitHub Actions).

## 4. Core Features

### 4.1. CLI Modes

The CLI will support two primary modes of operation:

- **Genie Mode (Interactive/Prompt-driven):**
  - Guides the user through a series of prompts (e.g., Inquirer.js style) to gather necessary input for a command.
  - Ideal for new users or complex operations where guidance is beneficial.
  - Example: `stacker deploy` (then prompts for workspace, deployable, parameters).
- **One-Shot Mode (Power-User/Argument-driven):**
  - Allows users to specify all command arguments directly in a single command.
  - Suitable for experienced users and automated environments (e.g., GitHub Actions).
  - Example: `stacker deploy --workspace=my-app --deployable=dockerImage --type=file --file=Dockerfile.prod --image=my-app:prod`

### 4.2. Workspace Discovery

- **Mechanism:** The CLI will identify workspaces by crawling folders specified in `pnpm-workspace.yaml` and reading their `package.json` files to understand workspace names and paths.
- **Scope:** Initial discovery will be on-demand per command execution (no persistent caching beyond the command's lifecycle) to avoid stale data and simplify initial implementation.
- **Details:** The CLI will be able to retrieve workspace names, paths, and potentially other relevant metadata from `package.json` files.

### 4.3. Deployment Execution

- **Target:** The CLI will invoke the `deployHandler` functions defined within a workspace's `deploy.config.mjs` file. These `deployHandler`s are now responsible for _defining_ Pulumi resources.
- **Selection:** Users will specify the target workspace and the `name` of the deployable within that workspace's `deploy.config.mjs` to execute.
- **Modes:**
  - **Dry Run:** The CLI will execute `pulumi preview` for the defined Pulumi resources. This simulates the deployment without making actual changes to the infrastructure.
  - **Actual Execution:** The CLI will execute `pulumi up` for the defined Pulumi resources. This provisions or updates the infrastructure as defined by the `deployHandler`.
- **Pulumi Project Orchestration:** The CLI dynamically creates a temporary Pulumi project and stack for each deployment. It writes a Pulumi program (`index.ts`) that calls the deployable's `deployHandler` to define the resources. This temporary project is then used to run `pulumi preview` or `pulumi up`, and is cleaned up afterward.
- **Parameter Passing:**
  - Parameters for deployables (e.g., `image`, `file`, `args` for `dockerImagePlugin`) will be passed via CLI flags.
  - For complex parameters like `args` (which is a `z.record(z.string(), z.string())`), the CLI should support both JSON string input (`--args '{"key":"value"}'`) and multiple key-value pairs (`--arg key=value --arg another=value`).

### 4.3.1. Secrets Handling

- **Environment Variable Sourcing:** The CLI will automatically source secrets required by deployable plugins from environment variables. The names of these environment variables will match the keys defined in the plugin's secrets schema (e.g., `DOCKER_USERNAME`, `DOCKER_PASSWORD`).
- **Validation:** Before invoking a `deployHandler`, the CLI will validate that all required secrets (as defined by the plugin's schema) are present in the environment. Missing required secrets will result in a clear error message.
- **Secure Passing:** Secrets will be passed securely to the `deployHandler` via the `context` object, ensuring they are not exposed in logs or command-line arguments.

### 4.4. Future Features (High-Level)

- **Project Generation:**
  - `stacker init`: Initialize a new Stacker monorepo.
  - `stacker workspace add`: Add a new workspace to an existing monorepo.
- **Project Management:**
  - `stacker deps update`: Update dependencies across workspaces.
  - `stacker config set/get`: Manage project-level configurations.
- **Secrets Management:**
  - `stacker secrets list --workspace <name>`: List all secrets required by deployable plugins within a given workspace's `deploy.config.mjs` file.
  - `stacker secrets validate --workspace <name>`: Validate that all required secrets for a given workspace are present in the current environment.
- **GitHub Actions Integration:** The one-shot mode will be heavily utilized in CI/CD workflows.

### 4.5. Config-Driven Command Definition

The Stacker CLI now utilizes a declarative, config-driven approach for defining commands and their options. Commands and their associated inputs (including validation and interactive prompt configurations) are defined using Zod schemas. This architecture provides significant benefits:

- **Simplified Command Creation:** New commands and options can be added by simply updating the command definitions, reducing boilerplate code.
- **Automatic Interactive Prompts:** The "Genie Mode" (interactive prompting) is automatically enabled and driven by the command definitions, ensuring consistency and reducing manual UI logic.
- **Enhanced Extensibility:** This flexible structure easily accommodates future CLI features, such as advanced debugging tools, comprehensive code generation, and more complex multi-step workflows, without requiring extensive refactoring of the core CLI logic.
- **Improved Maintainability:** Command logic and presentation are clearly separated, making the codebase easier to understand, test, and maintain.

## 5. User Experience (UX) & Design Principles

- **Intuitive Interaction:**
  - **Genie Mode:** Clear, guided prompts with descriptive text.
  - **One-Shot Mode:** Consistent and predictable flag naming conventions.
- **Smart Suggestions/Autocomplete:**
  - When prompting for workspace names, provide a list of discovered workspaces with typeahead/search capabilities.
  - Offer suggestions for deployable names based on the selected workspace's `deploy.config.mjs`.
- **Delightful Visuals:** Use appropriate colors, spinners, and progress indicators for long-running operations.
- **Clear Output:**
  - **Default:** Pretty, helpful, and friendly output summarizing the operation.
  - **Verbose/Debug:** Option to increase verbosity (e.g., `--debug` or `--verbose` flag) to show raw command output, detailed logs, etc.
- **Robust Error Handling:** Provide clear, actionable error messages.

## 6. Non-Functional Requirements

- **Performance:** Commands should execute efficiently, especially for common operations. Workspace discovery should be fast for typical monorepo sizes.
- **Security:** Handle secrets securely (though initial focus is on local interaction, future secret management features will require robust security).
- **Maintainability:** Codebase should be modular, well-documented and easy to extend.
- **Testability:** All components should be easily testable (unit, integration, E2E).
- **Extensibility:** The command definition system should allow for easy addition of new commands and sub-commands.
- **Cross-Platform Compatibility:** The CLI should function correctly on Linux, macOS, and Windows.
