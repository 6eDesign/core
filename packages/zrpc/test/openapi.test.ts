import { describe, it, expect } from 'vitest';
import { z } from '../src/zod';
import { createRoute } from '../src/router';
import { ZRPCService } from '../src/service';

describe('OpenAPI Generation', () => {
  it('should generate a well-formed OpenAPI document for basic types', () => {
    const service = new ZRPCService({ name: 'BasicService', port: 0 });

    const BasicSchema = z.object({
      id: z.string().uuid(),
      name: z.string().min(3).max(255),
      age: z.number().int().positive(),
      isActive: z.boolean().default(true),
      email: z.string().email().optional(),
      createdAt: z.string().datetime(),
    });

    const getBasicRoute = createRoute({
      path: '/basic/:id',
      method: 'get',
      input: z.object({ id: z.string().uuid() }),
      output: BasicSchema,
    });

    const createBasicRoute = createRoute({
      path: '/basic',
      method: 'post',
      input: BasicSchema.omit({ id: true, createdAt: true }),
      output: BasicSchema,
    });

    service.addRoute(getBasicRoute, async (input) => ({ ...input, name: 'Test', age: 30, isActive: true, email: 'test@example.com', createdAt: new Date().toISOString() }));
    service.addRoute(createBasicRoute, async (input) => ({ ...input, id: 'new-id', createdAt: new Date().toISOString() }));

    const openApiDoc = service.generateOpenAPI();
    expect(openApiDoc).toMatchSnapshot();
  });

  it('should correctly represent arrays and unions', () => {
    const service = new ZRPCService({ name: 'ComplexService', port: 0 });

    const ItemSchema = z.object({
      id: z.string(),
      value: z.string(),
    });

    const StatusEnum = z.enum(['pending', 'completed', 'failed']);

    const ComplexInputSchema = z.object({
      tags: z.array(z.string()).min(1),
      data: z.array(ItemSchema).optional(),
      status: StatusEnum,
      result: z.union([z.string(), z.number()]),
    });

    const ComplexOutputSchema = z.object({
      summary: z.string(),
      details: z.union([z.array(z.string()), z.null()]),
      itemsProcessed: z.number(),
    });

    const processComplexRoute = createRoute({
      path: '/process',
      method: 'post',
      input: ComplexInputSchema,
      output: ComplexOutputSchema,
    });

    service.addRoute(processComplexRoute, async (input) => ({
      summary: `Processed ${input.tags.length} tags`,
      details: input.data ? input.data.map(item => item.value) : null,
      itemsProcessed: input.data?.length ?? 0,
    }));

    const openApiDoc = service.generateOpenAPI();
    expect(openApiDoc).toMatchSnapshot();
  });

  it('should handle optional, nullable, and default values', () => {
    const service = new ZRPCService({ name: 'OptionalService', port: 0 });

    const OptionalSchema = z.object({
      name: z.string(),
      description: z.string().optional(),
      count: z.number().default(0),
      notes: z.string().nullable(),
    });

    const getOptionalRoute = createRoute({
      path: '/optional',
      method: 'get',
      input: z.object({ name: z.string() }),
      output: OptionalSchema,
    });

    service.addRoute(getOptionalRoute, async (input) => ({
      name: input.name,
      description: 'Optional description',
      count: 5,
      notes: null,
    }));

    const openApiDoc = service.generateOpenAPI();
    expect(openApiDoc).toMatchSnapshot();
  });

  it('should correctly apply schema metadata (description, example, component registration)', () => {
    const service = new ZRPCService({ name: 'SchemaMetadataService', port: 0 });

    const UserProfileSchema = z.object({
      userId: z.string().uuid().openapi({ description: 'Unique identifier for the product', example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' }),
      username: z.string().min(3).openapi({ description: "User's chosen username", example: 'johndoe' }),
      age: z.number().int().positive().openapi({ description: "User's age", example: 30 }),
      email: z.string().email().openapi({ description: "User's email address", example: 'john.doe@example.com' }),
    }).openapi('UserProfile', { description: 'Detailed user profile information' });

    const ProductItemSchema = z.object({
      productId: z.string().openapi({ description: 'ID of the product', example: 'prod-abc' }),
      quantity: z.number().int().positive().openapi({ description: 'Quantity of the product', example: 2 }),
    }).openapi('ProductItem'); // Register as component without extra metadata

    const OrderSchema = z.object({
      orderId: z.string().openapi({ description: 'Unique order ID', example: 'ord-xyz' }),
      items: z.array(ProductItemSchema).openapi({ description: 'List of products in the order' }),
      totalAmount: z.number().openapi({ description: 'Total amount of the order', example: 123.45 }),
    }).openapi('Order', { description: 'An order placed by a user' });

    const getUserProfileRoute = createRoute({
      path: '/profiles/{userId}',
      method: 'get',
      input: z.object({ userId: z.string() }),
      output: UserProfileSchema,
    });

    const createOrderRoute = createRoute({
      path: '/orders',
      method: 'post',
      input: OrderSchema.omit({ orderId: true }),
      output: OrderSchema,
    });

    service.addRoute(getUserProfileRoute, async (input) => ({
      userId: input.userId,
      username: 'testuser',
      age: 25,
      email: 'test@example.com',
    }));

    service.addRoute(createOrderRoute, async (input) => ({
      orderId: 'new-order-id',
      items: input.items,
      totalAmount: input.items.reduce((sum, item) => sum + item.quantity * 10, 0),
    }));

    const openApiDoc = service.generateOpenAPI();
    expect(openApiDoc).toMatchSnapshot();
  });

  it('should correctly apply route-level metadata', () => {
    const service = new ZRPCService({ name: 'RouteMetadataService', port: 0 });

    const SimpleInput = z.object({ query: z.string() });
    const SimpleOutput = z.object({ result: z.string() });

    const getWithMetadataRoute = createRoute({
      path: '/metadata-get',
      method: 'get',
      input: SimpleInput,
      output: SimpleOutput,
      openapi: {
        summary: 'Get data with metadata',
        description: 'This endpoint demonstrates route-level metadata for a GET request.',
        tags: ['Metadata', 'Examples'],
        operationId: 'getMetadataExample',
        parameters: [
          {
            name: 'customParam',
            in: 'header',
            required: true,
            description: 'A custom header parameter',
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: { description: 'Successful response with metadata' },
          400: { description: 'Bad request due to invalid input' },
        },
      },
    });

    const postWithMetadataRoute = createRoute({
      path: '/metadata-post',
      method: 'post',
      input: SimpleInput,
      output: SimpleOutput,
      openapi: {
        summary: 'Post data with metadata',
        description: 'This endpoint demonstrates route-level metadata for a POST request.',
        tags: ['Metadata'],
        operationId: 'postMetadataExample',
        requestBody: {
          description: 'Request body description',
          content: {
            'application/json': {
              schema: SimpleInput,
            },
          },
        },
        responses: {
          200: { description: 'Successful POST response' },
        },
      },
    });

    service.addRoute(getWithMetadataRoute, async (input) => ({
      result: `Processed ${input.query}` }));
    service.addRoute(postWithMetadataRoute, async (input) => ({
      result: `Posted ${input.query}` }));

    const openApiDoc = service.generateOpenAPI();
    expect(openApiDoc).toMatchSnapshot();
  });
});