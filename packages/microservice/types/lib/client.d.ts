export function client(sdkOptions: SDKOptions): <TInput, TOutput>(route: import("./router.js").BaseOptions<TInput, TOutput>) => (input: TInput) => Promise<TOutput>;
export function clientFactory<T>(fn: (t: ReturnType<(sdkOptions: SDKOptions) => <TInput, TOutput>(route: import("./router.js").BaseOptions<TInput, TOutput>) => (input: TInput) => Promise<TOutput>>) => T): (sdkOptions: SDKOptions) => T;
export type SDKOptions = {
    baseUrl: string;
};
