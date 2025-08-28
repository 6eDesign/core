import axios from 'axios';

/**
 * @template TInput, TOutput
 * @param {import('./router.js').BaseOptions<TInput, TOutput>} route
 * @returns {(input: TInput) => object}
 */
const getInputSetter = (route) => {
	switch (route.method) {
		case 'get':
			return (input) => ({ params: input });
		default:
			return (input) => ({ data: input });
	}
};

/**
 * @typedef {object} SDKOptions
 * @property {string} baseUrl
 */

/**
 * @template TInput, TOutput
 * @param {SDKOptions} sdkOptions
 * @param {import('./router.js').BaseOptions<TInput, TOutput>} route
 * @returns {(input: TInput) => Promise<TOutput>}
 */
const clientMethod = (sdkOptions, route) => {
	const inputSetter = getInputSetter(route);
	return (input) =>
		axios
			.request({
				method: route.method,
				baseURL: sdkOptions.baseUrl,
				url: route.path,
				...inputSetter(input)
			})
			.then(({ data }) => route.output.parse(data));
};

/**
 * @template TInput, TOutput
 * @typedef {(route: import('./router.js').BaseOptions<TInput, TOutput>) => (input: TInput) => Promise<TOutput>} ClientFunction
 */

/**
 * @param {SDKOptions} sdkOptions
 * @returns {ClientFunction}
 */
export const client = (sdkOptions) => {
	return (route) => clientMethod(sdkOptions, route);
};

/**
 * @template T
 * @param {(t: ClientFunction) => T} fn
 * @returns {(sdkOptions: SDKOptions) => T}
 */
export const clientFactory = (fn) => {
	return (sdkOptions) => {
		const t = client(sdkOptions);
		return fn(t);
	};
};
