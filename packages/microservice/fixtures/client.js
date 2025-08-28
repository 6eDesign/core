import { routes } from './routes';

import { clientFactory } from '../lib/client';

export const getSdk = clientFactory((t) => ({
	getProduct: t(routes.getProducts),
	patchProduct: t(routes.patchProduct)
}));
