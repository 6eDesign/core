import { routes } from './routes.js';

import { clientFactory } from '../lib/client.js';

export const getSdk = clientFactory((t) => ({
	getProduct: t(routes.getProducts),
	patchProduct: t(routes.patchProduct)
}));
