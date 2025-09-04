[**Documentation**](../../README.md)

***

[Documentation](../../README.md) / @6edesign/zrpc

# @6edesign/zrpc

<!-- Badges: Version, Build Status, npm, etc. -->

## Overview

A schema-driven library serving as a robust foundation for building type-safe microservice APIs and clients. It leverages Zod to define clear input and output schemas, enabling strong validation and automatic OpenAPI specification generation. The package supports HTTP communication via Express and integrates message-based interactions, providing rich intellisense for both TypeScript and JavaScript projects.

## Key Features

*   **Schema-Driven API Definition:** Define API contracts using Zod for robust validation.
*   **Type-Safe Development:** Ensures strong typing for controllers and clients in TypeScript and JavaScript.
*   **Automatic OpenAPI Generation:** Generate OpenAPI (Swagger) specifications directly from your route definitions.
*   **Multiple Transport Layers:** Supports HTTP (Express) and message-based communication.
*   **Excellent Developer Experience:** Provides rich intellisense and clear error handling.

## Installation

```bash
pnpm add @6edesign/zrpc
```

```bash
npm install @6edesign/zrpc
```

```bash
yarn add @6edesign/zrpc
```

## Quick Start

### 1. Define Schemas and Routes

Start by defining your data schemas using Zod and then create your API routes.

```typescript
// src/schemas.ts (or similar)
import { z } from './zod';
import { createRoute } from './router';

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

export const GetUserRoute = createRoute({
  path: '/users/:id',
  method: 'get',
  input: z.object({ id: z.string() }),
  output: UserSchema,
});

export const CreateUserRoute = createRoute({
  path: '/users',
  method: 'post',
  input: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
  output: UserSchema.extend({ createdAt: z.string() }),
});
```

### 2. Implement Your Service

Create an instance of `ZRPCService` and add your defined routes with their corresponding business logic (resolvers).

```typescript
// src/service-app.ts (or your main application file)
import { ZRPCService } from './service';
import { GetUserRoute, CreateUserRoute, UserSchema } from './schemas'; // Adjust path

const myService = new ZRPCService({
  name: 'UserService',
  port: 3000, // Or use 0 for a random available port
});

// Resolver for GetUserRoute
myService.addRoute(GetUserRoute, async (input) => {
  // In a real application, you would fetch data from a database
  if (input.id === '123') {
    return { id: '123', name: 'John Doe', email: 'john.doe@example.com' };
  }
  throw new Error('User not found');
});

// Resolver for CreateUserRoute
myService.addRoute(CreateUserRoute, async (input) => {
  // In a real application, save data to a database
  const newUser = { ...input, id: 'new-id-' + Date.now(), createdAt: new Date().toISOString() };
  console.log('New user created:', newUser);
  return newUser;
});

// Start the service
myService.start().then(() => {
  console.log(`User Service started on port ${myService.port}`);
});

// Optionally, generate OpenAPI spec
// const openApiSpec = myService.generateOpenAPI();
// console.log(JSON.stringify(openApiSpec, null, 2));
```

### 3. Define and Export Your SDK

Within your service package, define and export an object containing your API routes. This object serves as the type-safe SDK definition that other projects can consume.

```typescript
// packages/your-service/src/api/sdk.ts (or similar, within your service package)
import { clientFactory } from '@6edesign/zrpc';
import { GetUserRoute, CreateUserRoute } from '../schemas'; // Adjust path to your route definitions

// Define a collection of routes that form your service's API
const userServiceApiRoutes = {
  getUser: GetUserRoute,
  createUser: CreateUserRoute,
};

// Export a function that, when called with SDKOptions, returns the type-safe client
export const createUserServiceSDK = clientFactory(userServiceApiRoutes);
```

### 4. Consume the SDK in Another Project

In a separate application or repository, import the SDK definition and use `clientFactory` to create a type-safe client instance.

```typescript
// packages/another-app/src/index.ts (or your frontend application)
import { createUserServiceSDK } from '@6edesign/your-service'; // Import the SDK creation function from your service package

// Create an SDK instance pointing to your service
const userServiceClient = createUserServiceSDK({
  baseUrl: 'http://localhost:3000', // Or the actual URL of your deployed service
});

// Example: Fetch a user
userServiceClient.getUser({ id: '123' })
  .then(user => console.log('Fetched user:', user))
  .catch(error => console.error('Error fetching user:', error.message));

// Example: Create a user
userServiceClient.createUser({ name: 'Jane Doe', email: 'jane.doe@example.com' })
  .then(newUser => console.log('Created user:', newUser))
  .catch(error => console.error('Error creating user:', error.message));
```

## OpenAPI Generation

One of the core features of `@6edesign/zrpc` is its ability to automatically generate OpenAPI (Swagger) documentation directly from your Zod schemas and route definitions. This ensures your API documentation is always in sync with your code.

### Basic Generation

By default, `ZRPCService` will generate a basic OpenAPI specification for all registered routes. You don't need any extra configuration to get started.

```typescript
// Example: Basic OpenAPI generation
import { z } from './src/zod';
import { createRoute } from './src/router';
import { ZRPCService } from './src/service';

const SimpleUserSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const getSimpleUserRoute = createRoute({
  path: '/simple-users/{id}',
  method: 'get',
  input: z.object({ id: z.string() }),
  output: SimpleUserSchema,
});

const service = new ZRPCService({ name: 'SimpleService', port: 0 });
service.addRoute(getSimpleUserRoute, async (input) => ({ id: input.id, name: 'Test User' }));

const openApiSpec = service.generateOpenAPI();
// This `openApiSpec` will contain a basic definition for /simple-users/{id}
```
This will generate a basic OpenAPI definition for your `/simple-users/{id}` endpoint, inferring parameters and responses from your `input` and `output` schemas.

### Customizing Schemas with `.openapi()`

You can enrich the documentation for your Zod schemas by using the `.openapi()` method. This allows you to add `description`, `example` values, and register schemas as reusable components in the OpenAPI document's `components/schemas` section.

```typescript
import { z } from './src/zod';

const ProductSchema = z.object({
  productId: z.string().uuid().openapi({
    description: 'Unique identifier for the product',
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  }),
  name: z.string().min(3).openapi({
    description: 'Name of the product',
    example: 'Super Widget',
  }),
  price: z.number().positive().openapi({
    description: 'Price of the product in USD',
    example: 99.99,
  }),
}).openapi('Product', { // Register as a component named 'Product'
  description: 'Detailed information about a product',
});

// This schema will appear in #/components/schemas/Product
// with the provided descriptions and examples.
```

### Customizing Routes with `openapi` Property (Escape Hatch)

For more granular control over the generated OpenAPI operation (e.g., `summary`, `tags`, `operationId`), you can provide an `openapi` property directly within your `createRoute` options. This acts as an escape hatch to directly influence the OpenAPI [Operation Object](https://swagger.io/docs/specification/describing-operations/).

**Important:** `@6edesign/zrpc` automatically infers parameters and request bodies from your `input` schemas. You should generally *not* need to manually define `parameters` or `requestBody` within this `openapi` property unless you have very specific, non-standard requirements.

```typescript
import { createRoute } from './src/router';
import { z } from './src/zod';
import { ProductSchema } from './path/to/your/schemas'; // Assuming ProductSchema is defined elsewhere

const getProductDetailsRoute = createRoute({
  path: '/products/{productId}',
  method: 'get',
  input: z.object({ productId: z.string().uuid() }),
  output: ProductSchema,
  openapi: {
    summary: 'Retrieve product details',
    description: 'Fetches comprehensive details for a specific product by its ID.',
    tags: ['Products', 'Public API'],
    operationId: 'getProductDetailsById',
    parameters: [
      {
        name: 'productId',
        in: 'path',
        required: true,
        description: 'The unique identifier of the product',
        schema: { type: 'string', format: 'uuid' },
      },
      {
        name: 'includeReviews',
        in: 'query',
        required: false,
        description: 'Include customer reviews in the response',
        schema: { type: 'boolean' },
      },
    ],
    responses: {
      200: { description: 'Product details retrieved successfully' },
      404: { description: 'Product not found' },
    },
  },
});
```

## API Reference

TODO: Link to comprehensive API documentation (e.g., TypeDoc generated).

## Advanced Usage

*   **Integrating with a Message Bus:**
    `ZRPCService` can integrate with a message bus by passing an instance of `@6edesign/messenger.BaseDistributedEventBus` to its constructor. The service will then listen for messages on a queue named `${serviceName}ServiceQueue` and route them to the appropriate `addRoute` resolver based on the message `key`.

*   **Customizing Logger:**
    You can provide a custom logger conforming to the `Logger` interface to the `ZRPCService` constructor. This allows you to integrate with your preferred logging solution (e.g., Winston, Pino).

*   **Configuring CORS and Compression:**
    Control CORS (Cross-Origin Resource Sharing) and response compression by setting `useCors` and `useCompression` boolean options in the `ZRPCService` constructor. Both are `true` by default.

## Development

*   **Building:** `pnpm turbo build --filter=@6edesign/zrpc`
*   **Testing:** `pnpm turbo test --filter=@6edesign/zrpc`

## Contributing

(Standard section with guidelines for contributing to the project, e.g., code of conduct, how to submit issues/PRs.)

## License

(Standard section detailing the project's license.)
