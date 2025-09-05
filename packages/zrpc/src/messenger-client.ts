import { getRouteKey, RouteOptions } from './router';
import { BaseDistributedEventBus } from '@6edesign/messenger';
import { z } from 'zod';

export interface MessageClientSDKOptions {
  eventBus: BaseDistributedEventBus;
}

const clientMethod = <TInput, TOutput>(
  channel: string,
  sdkOptions: MessageClientSDKOptions,
  route: RouteOptions<TInput, TOutput>
) => {
  return async (input: TInput): Promise<void> => {
    route.input?.parse(input);
    return sdkOptions.eventBus.send(channel, {
      key: getRouteKey(route),
      input,
    });
  };
};

export const client = (
  channel: string,
  sdkOptions: MessageClientSDKOptions
) => {
  return <TInput, TOutput>(
    route: RouteOptions<TInput, TOutput>
  ): ((input: TInput) => Promise<void>) =>
    clientMethod(channel, sdkOptions, route);
};

export const messsageClientFactory = <T extends Record<string, RouteOptions<any, any>>>(
  channel: string,
  routes: T
) => {
  return (sdkOptions: MessageClientSDKOptions) => {
    const messageClient: any = {};
    for (const key in routes) {
      const route = routes[key];
      messageClient[key] = clientMethod(channel, sdkOptions, route);
    }
    return messageClient as {
      [K in keyof T]: T[K]['input'] extends z.ZodType<any, any, any>
        ? (input: z.infer<T[K]['input']>) => Promise<void>
        : (input: void) => Promise<void>;
    };
  };
};
