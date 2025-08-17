export function createCircuit<TOutput, TInitial extends TOutput | undefined>({ name, getter, initialValue, store, bad, stale, staleOnError, staleOnRefresh, logger, equalityChecker, setter, poolCreator, poolTimeout, live, }: CircuitOptions<TOutput, TInitial>): Circuit<TOutput, TInitial>;
export function createAggregateCircuit<TSources extends Record<string, Circuit<any, any>>, TOutput, TInitial extends TOutput | undefined>({ name, sources, deriver, initialValue, store, logger, equalityChecker, }: DerivedCircuitOptions<TOutput, TSources, TInitial>): Circuit<TOutput, TInitial>;
export type Subscriber<T, TAcceptsUndefined extends boolean = true> = TAcceptsUndefined extends true ? (fn: (val: T | undefined) => void) => () => void : (fn: (val: T) => void) => () => void;
export type Circuit<T, TInitial extends T | undefined> = {
    get: () => Promise<T>;
    set: (val: T) => Promise<void>;
    refresh: () => Promise<T>;
    subscribe: Subscriber<T, TInitial extends undefined ? true : false>;
    on: (eventName: string, fn: (data: any) => void) => () => void;
};
export type CircuitOptions<T, TInitial extends T | undefined> = {
    name: string;
    getter: () => Promise<T>;
    initialValue?: TInitial;
    store?: import("./stores.js").PersistenceLayer<T>;
    bad?: number;
    stale?: number;
    staleOnError?: boolean;
    staleOnRefresh?: boolean;
    logger?: any;
    setter?: (val: T) => Promise<T>;
    equalityChecker?: (a: T, b: T) => boolean;
    poolCreator?: import("./promisePools.memory.js").PoolCreator<(refresh?: boolean) => Promise<T>>;
    /**
     * the timeout used by the pool creator
     */
    poolTimeout?: number;
    /**
     * when true, the circuit subscribes to the cache stream
     */
    live?: boolean;
};
export type UnwrappedSources<S extends Record<string, Circuit<any, any>>> = { [K in keyof S]: Awaited<ReturnType<S[K]["get"]>>; };
export type DerivedCircuitOptions<TOutput, TSources extends Record<string, Circuit<any, any>>, TInitial extends TOutput | undefined> = {
    /**
     * ``
     */
    name: string;
    sources: TSources;
    deriver: (sources: UnwrappedSources<TSources>) => Promise<TOutput>;
    initialValue?: TInitial;
    store?: import("./stores.js").PersistenceLayer<TOutput>;
    logger?: any;
    equalityChecker?: (a: any, b: any) => boolean;
};
