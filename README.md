# @6edesign/core Monorepo

This monorepo houses shared packages and reusable CI/CD workflows used across various `@6edesign` projects. It is managed with `pnpm` workspaces and `turbo` for efficient task orchestration.

## Project Structure

*   **`/` (Root):** Contains global configuration files (`package.json`, `pnpm-workspace.yaml`, `turbo.json`, `.nvmrc`, `.prettierrc`, `.changeset/`).
*   **`packages/`:** Contains shared libraries and tools. Each subdirectory is a distinct package (e.g., `@6edesign/cicd`, `@6edesign/cli`).
*   **`.github/workflows/`:** Houses reusable GitHub Actions workflows for CI/CD tasks.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```
2.  **Install dependencies:**
    ```bash
    pnpm install
    ```
3.  **Build all packages:**
    ```bash
    pnpm turbo build
    ```
4.  **Generate new projects, packages, or services:**
    The `@6edesign/cli` package provides powerful code generation capabilities to quickly scaffold new projects, packages, and zRPC services, adhering to the monorepo's conventions. This simplifies the setup of new components and ensures consistency across the codebase.

    You can generate:

    *   **New Monorepo Projects:** Use `pnpm exec stacker new-project` to bootstrap a complete monorepo structure.
    *   **New Packages:** Use `pnpm exec stacker new-package` to create new shared libraries or utilities within the `packages/` directory.
    *   **New zRPC Services:** Use `pnpm exec stacker new-zrpc-service` to scaffold new microservices within the `apps/` directory, with options for JavaScript or TypeScript.

    For detailed usage and examples of these code generation commands, please refer to the [CLI's README.md](packages/cli/README.md).

5.  **Run tests for all packages:**
    ```bash
    pnpm turbo test
    ```

## Packages

This monorepo includes the following shared packages:

*   `@6edesign/cicd`: Core CI/CD functionalities and plugins.
*   `@6edesign/cicd-core`: Foundational CI/CD abstractions.
*   `@6edesign/cicd-internal`: Internal CI/CD utilities.
*   `@6edesign/cli`: Command-line interface tools.
*   `@6edesign/data-circuits`: Data circuit utilities.
*   `@6edesign/eslint-config`: Shared ESLint configurations.
*   `@6edesign/messenger`: Messaging utilities.
*   `@6edesign/microservice`: Microservice development utilities.
*   `@6edesign/tracing`: Distributed tracing utilities.
*   `@6edesign/tsconfig`: Shared TypeScript configurations.

## CI/CD Workflows

Reusable GitHub Actions workflows are located in `.github/workflows/`. These workflows are designed to be called by other repositories to standardize CI/CD practices across `@6edesign` projects.

## Contributing

Contributions are welcome! Please refer to the project's contributing guidelines (if available) for more information.
