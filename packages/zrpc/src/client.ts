import axios, { AxiosRequestConfig } from 'axios';
import { RouteOptions } from './router';

const getInputSetter = <TInput, TOutput>(route: RouteOptions<TInput, TOutput>) => {
	switch (route.method) {
		case 'get':
			return (input: TInput): Partial<AxiosRequestConfig> => ({ params: input });
		default:
			return (input: TInput): Partial<AxiosRequestConfig> => ({ data: input });
	}
};

export interface SDKOptions {
	baseUrl: string;
}

const clientMethod = <TInput, TOutput>(
	sdkOptions: SDKOptions,
	route: RouteOptions<TInput, TOutput>
) => {
	const inputSetter = getInputSetter(route);
	return (input: TInput): Promise<TOutput> =>
		axios
			.request({
				method: route.method,
				baseURL: sdkOptions.baseUrl,
				url: route.path,
				...inputSetter(input)
			})
			.then(({ data }) => route.output!.parse(data));
};

export const client = (sdkOptions: SDKOptions) => {
	return <TInput, TOutput>(
		route: RouteOptions<TInput, TOutput>
	): ((input: TInput) => Promise<TOutput>) => clientMethod(sdkOptions, route);
};

export type ClientBuilder<TRoutes> = {
	[K in keyof TRoutes]: TRoutes[K] extends RouteOptions<infer TInput, infer TOutput>
		? (input: TInput) => Promise<TOutput>
		: never;
};

export const clientFactory = <T extends Record<string, RouteOptions<any, any>>>(routes: T) => {
	return (sdkOptions: SDKOptions): ClientBuilder<T> => {
		const apiClient: any = {};
		for (const key in routes) {
			const route = routes[key];
			apiClient[key] = clientMethod(sdkOptions, route);
		}
		return apiClient as ClientBuilder<T>;
	};
};
