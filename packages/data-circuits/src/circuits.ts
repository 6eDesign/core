import { createEmitter } from './emitter';
import { createPool, PoolCreator } from './promisePools.memory';
import { createMemoryStore } from './stores.memory';
import { PersistenceLayer, WrappedValue } from './stores';

export type Subscriber<T, TAcceptsUndefined extends boolean = true> =
  TAcceptsUndefined extends true
    ? (fn: (val: T | undefined) => void) => () => void
    : (fn: (val: T) => void) => () => void;

export interface Circuit<T, TInitial> {
  get(): Promise<T>;
  set(val: T): Promise<void>;
  refresh(): Promise<T>;
  subscribe: Subscriber<T, TInitial extends undefined ? true : false>;
  on<TEventName extends (typeof circuitEvents)[number]['eventName']>(
    eventName: TEventName,
    fn: (data: Extract<(typeof circuitEvents)[number], { eventName: TEventName }>['data']) => void
  ): () => void;
}

export interface CircuitOptions<T, TInitial> {
  name: string;
  getter: () => Promise<T>;
  initialValue?: TInitial;
  store?: PersistenceLayer<T>;
  bad?: number;
  stale?: number;
  staleOnError?: boolean;
  staleOnRefresh?: boolean;
  logger?: any; // TODO: better logger type
  setter?: (val: T) => Promise<T>;
  equalityChecker?: (a: T, b: T) => boolean;
  poolCreator?: PoolCreator<() => Promise<T>>;
  poolTimeout?: number;
  live?: boolean;
}

const circuitEvents = [
  { eventName: 'active' as const, data: undefined },
  { eventName: 'inactive' as const, data: undefined },
];

export const createCircuit = <TOutput, TInitial extends TOutput | undefined>({  name,  getter,  initialValue,  store = createMemoryStore<TOutput>(),  bad = 0,  stale,  staleOnError = false,  staleOnRefresh = false,  logger = console,  equalityChecker = (a, b) => a === b,  setter,  poolCreator = createPool,  poolTimeout = 5000,  live = false,}: CircuitOptions<TOutput, TInitial>): Circuit<TOutput, TInitial> => {
  if (!name || !getter) throw new Error('name and getter are required');

  let value: WrappedValue<TOutput> | undefined =
    typeof initialValue === 'undefined'
      ? undefined
      : {
          data: initialValue as TOutput,
          bad: Date.now() + bad,
          stale: Date.now() + (stale ?? bad),
        };

  let subscribers: ((data: TOutput | undefined) => void)[] = [];
  let lastValue: TOutput | undefined = undefined;
  stale = stale ?? bad;

  const ingestValueUpdate = async (data: TOutput) => {
    if (!equalityChecker(lastValue as TOutput, data)) informSubscribers(data);
    lastValue =
      typeof data === 'object' ? JSON.parse(JSON.stringify(data)) : data;
    value = {
      data,
      bad: Date.now() + bad,
      stale: Date.now() + (stale ?? bad),
    };

    return store.set(name, value);
  };

  const ingestValueFromStream = async ({ data, bad, stale }: WrappedValue<TOutput>) => {
    if (!equalityChecker(lastValue as TOutput, data)) informSubscribers(data);
    lastValue = data;
    value = {
      data,
      bad,
      stale,
    };
  };

  const get = async (refresh?: boolean): Promise<TOutput> => {
    if (refresh || !value || Date.now() > value.stale) {
      value =
        bad <= 0 ? undefined : await store.get(name).catch(() => undefined);
    }
    if (!refresh && value && Date.now() < value.stale) {
      return value.data;
    }
    if (!refresh && value && Date.now() > value.bad) {
      value = undefined;
    }

    const invalidatePromise = getter()
      .then(async (data) => {
        await ingestValueUpdate(data);
        return data;
      })
      .catch((e) => {
        if (value && staleOnError) {
          logger.warn(`Returning stale data for ${name}`);
          return value.data;
        }

        if (refresh || !value || !staleOnRefresh) {
          throw e;
        }

        // This will be caught by the caller if it is not a refresh
        return undefined as any; // Should not happen if logic is correct
      });

    if (!refresh && value && staleOnRefresh) return value.data;
    return invalidatePromise;
  };

  const pool = poolCreator(get, { id: name, timeout: poolTimeout });
  const refreshPool = poolCreator(get, {
    id: `${name}_refresh`,
    timeout: poolTimeout,
  });

  const informSubscribers = (data: TOutput | undefined) => {
    subscribers.forEach((s) => s(data));
  };

  const { emit, on } = createEmitter(circuitEvents);

  return {
    on,
    subscribe(fn: (val: TOutput | undefined) => void) {
      if (subscribers.length === 0) emit('active', undefined);
      subscribers = [...subscribers.filter((s) => s !== fn), fn];
      fn(value?.data ?? initialValue);
      this.get();

      const storeUnsubscribe = !live
        ? undefined
        : store.subscribe(name, (val) => {
            ingestValueFromStream(val);
          });

      return () => {
        if (storeUnsubscribe) storeUnsubscribe();
        if (!subscribers.length) return;
        subscribers = subscribers.filter((s) => s !== fn);
        if (!subscribers.length) emit('inactive', undefined);
      };
    },

    async get(): Promise<TOutput> {
      return pool.get();
    },

    async set(val: TOutput): Promise<void> {
      ingestValueUpdate(setter ? await setter(val) : val);
    },

    async refresh(): Promise<TOutput> {
      if (staleOnRefresh) return refreshPool.get(true);
      return pool.get(true);
    },
  };
};

export type UnwrappedSources<S extends Record<string, Circuit<any, any>>> = {
  [K in keyof S]: Awaited<ReturnType<S[K]['get']>>;
};

export interface DerivedCircuitOptions<
  TOutput,
  TSources extends Record<string, Circuit<any, any>>,
  TInitial
> {
  name: string;
  sources: TSources;
  deriver: (sources: UnwrappedSources<TSources>) => Promise<TOutput>;
  initialValue?: TInitial;
  store?: PersistenceLayer<TOutput>;
  logger?: any; // TODO: better logger type
  equalityChecker?: (a: TOutput, b: TOutput) => boolean;
}

export const createAggregateCircuit = <
  TSources extends Record<string, Circuit<any, any>>,
  TOutput,
  TInitial extends TOutput | undefined
>({
  name,
  sources,
  deriver,
  initialValue,
  store,
  logger,
  equalityChecker,
}: DerivedCircuitOptions<TOutput, TSources, TInitial>): Circuit<
  TOutput,
  TInitial
> => {
  let value: UnwrappedSources<TSources> | undefined = undefined;

  const circuit = createCircuit({
    name,
    store,
    logger,
    initialValue,
    equalityChecker,
    getter: async () => {
      const entries = await Promise.all(
        Object.entries(sources).map(async ([k, v]) => {
          return [k, await v.get()];
        })
      );
      value = Object.fromEntries(entries) as UnwrappedSources<TSources>;
      return await deriver(value);
    },
  });

  let subscribers: ((val: TOutput) => void)[] = [];
  let sourceUnsubscribers: (() => void)[] = [];

  return {
    ...circuit,
    async refresh() {
      Object.values(sources).forEach((source) => source.refresh());
      return this.get();
    },
    subscribe(fn: (val: TOutput | undefined) => void) {
      const globalUnsubscribe = circuit.subscribe(fn);
      subscribers.push(fn as (val: TOutput) => void);

      if (sourceUnsubscribers.length === 0) {
        sourceUnsubscribers = Object.entries(sources).map(([k, c]) =>
          c.subscribe(async (v) => {
            if (!value || typeof v === 'undefined') return;
            value = { ...value, [k]: v };
            if (Object.values(value).every((v) => v !== undefined)) {
              circuit.set(await deriver(value as UnwrappedSources<TSources>));
            }
          })
        );
      }
      return () => {
        globalUnsubscribe();
        subscribers = subscribers.filter((v) => v === fn);
        if (subscribers.length === 0) {
          sourceUnsubscribers.forEach((s) => s());
          sourceUnsubscribers = [];
        }
      };
    },
  };
};