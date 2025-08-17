import { MicroService } from '../lib/microservice.js';
// import { STATIC_PRODUCTS } from './data.js';
// import { routes } from './routes.js';

const service = new MicroService({ port: 3000, name: 'test-server' });

service.addRoute(routes.getProducts, async () => {
  return STATIC_PRODUCTS;
});

service.addRoute(routes.patchProduct, async (input) => {
  return {
    id: input.id,
    category: input.category ?? 'purple',
    name: input.name ?? 'frank',
  };
});

export { service };
