# Plan for @6edesign/zrpc

## Phase 1: Create the `new-package` Command in `@6edesign/cli`

1.  **Define the Command:**
    *   Create a new file: `packages/cli/src/commands/new-package.ts`.
    *   In this file, use the `defineCommand` utility to create a `newPackageCommand`.

2.  **Specify Inputs:**
    *   The command will have two inputs defined by a Zod schema:
        *   `name`: `z.string()` - The name of the package (e.g., "zrpc").
        *   `description`: `z.string()` - A short description for the `package.json`.
    *   Each input will have a `promptConfig` to ask the user for the values if not provided as command-line options.

3.  **Implement the Handler:**
    *   The `handler` function for the command will receive the `name` and `description`.
    *   It will perform the file system operations:
        *   Create the directory `packages/<name>`.
        *   Create subdirectories `src` and `test`.
        *   Generate the content for `package.json`, `tsconfig.json`, `tsdown.config.ts`, `vitest.config.ts`, `README.md`, and a placeholder `src/index.ts`.
        *   Write these files to the newly created directory.

4.  **Register the Command:**
    *   Import `newPackageCommand` into `packages/cli/src/commands/definitions.ts`.
    *   Add it to the exported `commands` array.

5.  **Build and Verify:**
    *   Run `pnpm turbo build --filter=@6edesign/cli` to compile the changes.

## Phase 2: Generate `@6edesign/zrpc` using the New Command

6.  **Execute the Generator:**
    *   Run the new command: `pnpm --filter=@6edesign/cli start new-package`.
    *   When prompted, enter "zrpc" for the name and an appropriate description. This will scaffold the entire package structure.

## Phase 3: Port Logic and Implement Features

7.  Add dependencies from `microservice` to `packages/zrpc/package.json` and run `pnpm install`.
8.  Port the core logic from JavaScript to TypeScript in `packages/zrpc/src/`.
9.  Port the CLI and tests to `packages/zrpc/`.

## Phase 4: Finalize and Document

10. Verify the new `@6edesign/zrpc` package by running `build`, `check-types`, and `test`.
11. Create the `PLAN.md` and `PROGRESS.md` files inside `packages/zrpc/`.
