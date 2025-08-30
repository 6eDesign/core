import { z } from '../../src/zod';
import { createRoute } from '../../src/router';

export const productsRoute = createRoute({
  path: '/',
  method: 'get',
  input: z.object({
    query: z.string(),
  }),
  output: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      price: z.number(),
    })
  ),
});

export const productsRouteWithBody = createRoute({
  path: '/products',
  method: 'post',
  input: z.object({
    name: z.string(),
    price: z.number(),
  }),
  output: z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
  }),
});
