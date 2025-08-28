/**
 * @typedef {object} SDKOptions
 * @property {import('@6edesign/messenger').BaseDistributedEventBus} eventBus
 */

import { getRouteKey } from './router';

/**
 * @template TInput, TOutput
 * @param {string} channel
 * @param {SDKOptions} sdkOptions
 * @param {import('./router').BaseOptions<TInput, TOutput>} route
 * @returns {(input: TInput) => Promise<void>}
 */
const clientMethod = (channel, sdkOptions, route) => {
	return async (input) => {
		// validate input, create and send message
		// allow client to consume all types of errors
		route.input.parse(input);
		return sdkOptions.eventBus.send(channel, {
			key: getRouteKey(route),
			input
		});
	};
};

/**
 * @param {string} channel
 * @param {SDKOptions} sdkOptions
 */
export const client = (channel, sdkOptions) => {
	/**
	 * @template TInput, TOutput
	 * @param {import('./router').BaseOptions<TInput, TOutput>} route
	 */
	return (route) => clientMethod(channel, sdkOptions, route);
};

/**
 * @template T
 * @param {string} channel
 * @param {(t: ReturnType<client>) => T} fn
 * @returns {(sdkOptions: SDKOptions) => T}
 */
export const messsageClientFactory = (channel, fn) => {
	return (sdkOptions) => {
		const t = client(channel, sdkOptions);
		return fn(t);
	};
};
