import { MicroService } from '../lib/microservice';
// import { STATIC_PRODUCTS } from './data';
// import { routes } from './routes';

const service = new MicroService({ port: 3000, name: 'test-server' });

service.addRoute(routes.getProducts, async () => {
	return STATIC_PRODUCTS;
});

service.addRoute(routes.patchProduct, async (input) => {
	return {
		id: input.id,
		category: input.category ?? 'purple',
		name: input.name ?? 'frank'
	};
});

export { service };
