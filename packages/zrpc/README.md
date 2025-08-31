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

## API Reference

TODO: Link to comprehensive API documentation (e.g., TypeDoc generated).

## Advanced Usage

*   **Integrating with a Message Bus:**
    `ZRPCService` can integrate with a message bus by passing an instance of `@6edesign/messenger.BaseDistributedEventBus` to its constructor. The service will then listen for messages on a queue named `${serviceName}ServiceQueue` and route them to the appropriate `addRoute` resolver based on the message `key`.

*   **Customizing Logger:**
    You can provide a custom logger conforming to the `Logger` interface to the `ZRPCService` constructor. This allows you to integrate with your preferred logging solution (e.g., Winston, Pino).

*   **Configuring CORS and Compression:**
    Control CORS (Cross-Origin Resource Sharing) and response compression by setting `useCors` and `useCompression` boolean options in the `ZRPCService` constructor. Both are `true` by default.

*   **Customizing OpenAPI Document Generation:**
    The `generateOpenAPI()` method returns a standard OpenAPI 3.0 `OpenAPIObject`. You can call this method to retrieve the generated specification and further customize it or serve it via a different endpoint.

## Development

*   **Building:** `pnpm turbo build --filter=@6edesign/zrpc`
*   **Testing:** `pnpm turbo test --filter=@6edesign/zrpc`

## Contributing

(Standard section with guidelines for contributing to the project, e.g., code of conduct, how to submit issues/PRs.)

## License

(Standard section detailing the project's license.)