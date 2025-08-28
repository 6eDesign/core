import axios from 'axios';

/**
 * @template TInput, TOutput
 * @param {import('./router').BaseOptions<TInput, TOutput>} route
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
 * @param {import('./router').BaseOptions<TInput, TOutput>} route
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
 * @param {SDKOptions} sdkOptions
 */
export const client = (sdkOptions) => {
	/**
	 * @template TInput, TOutput
	 * @param {import('./router').BaseOptions<TInput, TOutput>} route
	 */
	return (route) => clientMethod(sdkOptions, route);
};

/**
 * @template T
 * @param {(t: ReturnType<typeof client>) => T} fn
 * @returns {(sdkOptions: SDKOptions) => T}
 */
export const clientFactory = (fn) => {
	return (sdkOptions) => {
		const t = client(sdkOptions);
		return fn(t);
	};
};
