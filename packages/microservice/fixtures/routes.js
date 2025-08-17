import { z } from 'zod';
import { createRoute } from '../lib/router.js';

const productSchema = z
  .object({
    category: z.string(),
    name: z.string(),
    id: z.number(),
  })
  .required();

const patchSchema = productSchema.partial({ name: true, category: true });

export const routes = {
  getProducts: createRoute({
    path: '/',
    input: z.object({ query: z.string() }),
    output: z.array(productSchema),
  }),
  patchProduct: createRoute({
    path: '/',
    method: 'patch',
    input: patchSchema,
    output: productSchema,
  }),
};
