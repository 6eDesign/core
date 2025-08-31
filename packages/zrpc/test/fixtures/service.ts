import { ZRPCService } from '../../src/service';
import { productsRoute, productsRouteWithBody } from './routes';
import { STATIC_PRODUCTS } from './data';

export const service = new ZRPCService({
  name: 'test-service',
  port: 0, // Use port 0 to assign a random available port for testing
});

service.addRoute(productsRoute, async (input) => {
  // In a real service, you'd query a database or external API
  return STATIC_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(input.query.toLowerCase())
  );
});

service.addRoute(productsRouteWithBody, async (input) => {
  // In a real service, you'd save to a database
  const newProduct = { id: String(STATIC_PRODUCTS.length + 1), ...input };
  STATIC_PRODUCTS.push(newProduct);
  return newProduct;
});