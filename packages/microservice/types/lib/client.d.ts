export function client(sdkOptions: SDKOptions): (route: import("./router.js").BaseOptions<TInput, TOutput>) => (input: TInput) => Promise<TOutput>;
export function clientFactory<T, TInput, TOutput>(fn: (t: (route: import("./router.js").BaseOptions<TInput, TOutput>) => (input: TInput) => Promise<TOutput>) => T): (sdkOptions: SDKOptions) => T;
export type SDKOptions = {
    baseUrl: string;
};
