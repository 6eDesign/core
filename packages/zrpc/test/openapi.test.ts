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

    service.addRoute(getBasicRoute, async (input) => ({ id: input.id, name: 'Test', age: 30, isActive: true, email: 'test@example.com', createdAt: new Date().toISOString() }));
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
});
