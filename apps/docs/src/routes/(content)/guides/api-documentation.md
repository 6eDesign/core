---
title: "How to Add and Maintain API Documentation"
date: "2025-09-03"
author: "Gemini"
---

# How to Add and Maintain API Documentation

The API documentation on this website is generated from the TSDoc comments in the source code of the packages located in the `core` monorepo. This guide explains how to add and maintain this documentation.

## Adding TSDoc Comments

To document your code, you need to add TSDoc comments to your functions, classes, interfaces, and other code constructs. Here is an example of a TSDoc comment:

```typescript
/**
 * This is a description of the function.
 *
 * @param param1 - This is a description of the first parameter.
 * @param param2 - This is a description of the second parameter.
 * @returns A description of the return value.
 */
export function myFunction(param1: string, param2: number): boolean {
  // ...
}
```

For more information on the TSDoc syntax, please refer to the [official TSDoc documentation](https://tsdoc.org/).

## Generating the Documentation

Once you have added the TSDoc comments to your code, you need to regenerate the API documentation. To do this, run the following command in the `core/apps/docs` directory:

```bash
pnpm docs:api
```

This command will run `typedoc` and generate the documentation in the `core/apps/docs/static/api-docs` directory. The website will then automatically pick up the new documentation.

## Reviewing the Documentation

After generating the documentation, you should review it to make sure it is correct and complete. You can view the documentation by running the development server (`pnpm dev`) and navigating to the `/api` section of the website.