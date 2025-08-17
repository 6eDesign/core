export function createRedisStore<T>({ namespace, redis, timeout, }: {
    namespace?: string;
    redis?: Client;
    timeout?: number;
}): PersistenceLayer<T>;
export type WrappedValue<T> = {
    bad: number;
    stale: number;
    data: T;
};
export type PersistenceLayer<T> = {
    get: (key: string) => Promise<WrappedValue<T> | undefined>;
    set: (key: string, value: WrappedValue<T>) => Promise<void>;
    delete: (key: string) => Promise<void>;
    on: (eventName: string, data: any) => () => void;
    subscribe: (key: string, cb: (val: WrappedValue<T>) => void) => () => void;
};
import Client from "ioredis";
