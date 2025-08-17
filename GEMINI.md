## Project Overview

This is a JavaScript/TypeScript monorepo managed with `pnpm` workspaces and `turbo` for task orchestration. It contains shared packages in the `packages/` directory and reusable GitHub Actions workflows in `.github/workflows/`.

## Building and Running

To build, test, or run the project, you will typically use `pnpm turbo` commands. Here are some common commands:

*   **Install dependencies:** `pnpm install`
*   **Build all projects:** `pnpm turbo build`
*   **Run tests for all projects:** `pnpm turbo test`
*   **Run type checking for all projects:** `pnpm turbo check-types`

To run a specific task for a specific package, you can use the `--filter` flag with the package name (including scope). For example:

*   **Build the `cicd` package:** `pnpm turbo build --filter=@6edesign/cicd`
*   **Run tests for the `cli` package:** `pnpm turbo test --filter=@6edesign/cli`

**Important Note on Turbo Filters:** When using `--filter`, Turbo will automatically build the dependencies of the targeted packages if necessary. This means you often don't need to explicitly build dependent packages beforehand.

## Project Structure and Key Files

*   **`/` (Project Root):** Contains global configuration files such as `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `.nvmrc`, `.prettierrc`, and `.changeset/`.
*   **`packages/`:** Contains shared libraries, utilities, and internal tools used across the monorepo. Each subdirectory within `packages/` (e.g., `packages/cli`, `packages/cicd`, `packages/microservice`) is a distinct package.
    *   **Key files within a package:** `package.json` (package dependencies, scripts), `tsconfig.json` (TypeScript configuration).
*   **`.github/workflows/`:** Houses reusable GitHub Actions workflows. These are designed to be called by other repositories.

## Development Conventions

*   **Monorepo Structure:** Shared packages reside in `packages/`.
*   **Task Runner:** `turbo` is used for consistent build, test, and other development tasks across the monorepo.
*   **Package Manager:** `pnpm` is the package manager of choice, leveraging workspaces for dependency management.
*   **Configuration:** Project-wide configurations are typically found in the root directory. Individual packages have their own `package.json` and specific configurations.
*   **Code Style:** Adhere to the existing code style and formatting as defined by `.prettierrc` and ESLint configurations (e.g., `@6edesign/eslint-config`).

## How to Approach Tasks

When working on a task (e.g., bug fix, new feature):

1.  **Understand the Scope:** Determine which `package` is affected.
2.  **Locate Relevant Files:** Use the project structure knowledge to navigate to the correct `packages/` subdirectory.
3.  **Examine `package.json`:** Check the `scripts` and `dependencies` in the relevant `package.json`.
4.  **Adhere to Conventions:** Mimic existing code style, structure, and patterns within the specific package you are modifying.
5.  **Test Coverage:** If making changes to logic, check for existing tests and consider adding new ones in the `test/` directory.
6.  **Verification:** After any code change, run relevant build, linting, and testing commands using `pnpm turbo` with appropriate filters (e.g., `pnpm turbo build --filter=@6edesign/your-package`).
