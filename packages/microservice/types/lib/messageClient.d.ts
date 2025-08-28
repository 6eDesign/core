export function client(channel: string, sdkOptions: SDKOptions): (route: import("./router").BaseOptions<TInput, TOutput>) => (input: TInput) => Promise<void>;
export function messsageClientFactory<T>(channel: string, fn: (t: ReturnType<(channel: string, sdkOptions: SDKOptions) => (route: import("./router").BaseOptions<TInput, TOutput>) => (input: TInput) => Promise<void>>) => T): (sdkOptions: SDKOptions) => T;
export type SDKOptions = {
    eventBus: import("@6edesign/messenger").BaseDistributedEventBus;
};
