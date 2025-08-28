import { createEmitter } from "./emitter.js";
import { createPool } from "./promisePools.memory.js";
import { createMemoryStore } from "./stores.memory.js";

/**
 * @template T
 * @template {boolean} [TAcceptsUndefined = true]
 * @typedef {TAcceptsUndefined extends true ? (fn: (val: T | undefined) => void) => () => void : (fn: (val: T) => void) => () => void} Subscriber
 */

/**
 * @template T
 * @template {T | undefined} TInitial
 * @typedef {Object} Circuit
 * @property {() => Promise<T>} get
 * @property {(val: T) => Promise<void>} set
 * @property {() => Promise<T>} refresh
 * @property {Subscriber<T, TInitial extends undefined ? true : false>} subscribe
 * @property {(eventName: string, fn: (data: any) => void) => () => void} on
 */

/**
 * @template T
 * @template {T | undefined} TInitial
 * @typedef {Object} CircuitOptions
 * @property {string} name
 * @property {() => Promise<T>} getter
 * @property {TInitial} [initialValue]
 * @property {import('./stores').PersistenceLayer<T>} [store = createMemoryStore()]
 * @property {number} [bad]
 * @property {number} [stale]
 * @property {boolean} [staleOnError]
 * @property {boolean} [staleOnRefresh]
 * @property {Object} [logger]
 * @property {(val: T) => Promise<T>} [setter]
 * @property {(a: T, b: T) => boolean} [equalityChecker]
 * @property {import('./promisePools.memory').PoolCreator<(refresh?: boolean) => Promise<T>>} [poolCreator]
 * @property {number} [poolTimeout] the timeout used by the pool creator
 * @property {boolean} [live] when true, the circuit subscribes to the cache stream
 */

/**
 * @template TOutput
 * @template {TOutput | undefined} TInitial
 * @param {CircuitOptions<TOutput, TInitial>} options
 * @returns {Circuit<TOutput, TInitial>}
 */
export const createCircuit = ({
  name,
  getter,
  initialValue,
  store = createMemoryStore(),
  bad = 0,
  stale = undefined,
  staleOnError = false,
  staleOnRefresh = false,
  logger = console,
  equalityChecker = (a, b) => a === b,
  setter,
  poolCreator = createPool,
  poolTimeout = 5000,
  live = false,
}) => {
  if (!name || !getter) throw new Error("name and getter are required");

  /** @type {import('./stores').WrappedValue<TOutput>|undefined} */
  let value =
    typeof initialValue === "undefined"
      ? undefined
      : {
          data: initialValue,
          bad: Date.now() + bad,
          stale: Date.now() + (stale ?? bad),
        };

  /** @type {((data: TOutput) => void)[]} */
  let subscribers = [];
  /** @type {TOutput|undefined} */
  let lastValue = undefined;
  stale = stale ?? bad;

  /**
   * @param {TOutput} data
   * @returns Promise<void>
   */
  const ingestValueUpdate = async (data) => {
    if (!equalityChecker(lastValue, data)) informSubscribers(data);
    lastValue =
      typeof data === "object" ? JSON.parse(JSON.stringify(data)) : data;
    value = {
      data,
      bad: Date.now() + bad,
      stale: Date.now() + (stale ?? bad),
    };

    return store.set(name, value);
  };

  /**
   * @param {import('./stores').WrappedValue<TOutput>} data
   */
  const ingestValueFromStream = async ({ data, bad, stale }) => {
    if (!equalityChecker(lastValue, data)) informSubscribers(data);
    lastValue = data;
    value = {
      data,
      bad,
      stale,
    };
  };

  /**
   * @param {boolean} [refresh]
   * @returns {Promise<TOutput>}
   */
  const get = async (refresh) => {
    if (refresh || !value || Date.now() < value.stale) {
      value =
        bad <= 0 ? undefined : await store.get(name).catch(() => undefined);
    }
    if (!refresh && value && Date.now() < value.stale) return value.data;
    if (!refresh && value && Date.now() > value.bad) value = undefined;

    let invalidatePromise = getter()
      .then(async (data) => {
        await ingestValueUpdate(data);
        return data;
      })
      .catch((e) => {
        if (value && staleOnError) {
          logger.warn(`Returning stale data for ${name}`);
          return value.data;
        }

        // it's important that we swallow errors when we intend to return stale
        if (refresh || !value || !staleOnRefresh) {
          throw e;
        }
      });

    if (!refresh && value && staleOnRefresh) return value.data;
    return invalidatePromise;
  };

  const pool = poolCreator(get, { id: name, timeout: poolTimeout });
  const refreshPool = poolCreator(get, {
    id: `${name}_refresh`,
    timeout: poolTimeout,
  });

  /**
   * @param {TOutput|undefined} data
   */
  const informSubscribers = (data) => {
    subscribers.forEach((s) => s(data));
  };

  const { emit, on } = createEmitter([
    { eventName: /** @type {const} **/ ("active"), data: undefined },
    {
      eventName: /** @type {const} **/ ("inactive"),
      data: undefined,
    },
  ]);

  return {
    on,
    subscribe(fn) {
      if (subscribers.length === 0) emit("active", undefined);
      subscribers = [...subscribers.filter((s) => s !== fn), fn];
      fn(value?.data ?? initialValue);
      this.get();

      let storeUnsubscribe = !live
        ? undefined
        : store.subscribe(name, (val) => {
            ingestValueFromStream(val);
          });

      return () => {
        if (storeUnsubscribe) storeUnsubscribe();
        if (!subscribers.length) return;
        subscribers = subscribers.filter((s) => s !== fn);
        if (!subscribers.length) emit("inactive", undefined);
      };
    },
    /**
     * @returns {Promise<TOutput>}
     */
    async get() {
      return pool.get();
    },

    /**
     * @param {TOutput} val
     * @returns {Promise<void>}
     */
    async set(val) {
      ingestValueUpdate(setter ? await setter(val) : val);
    },

    async update(fn) {},

    /**
     * @returns {Promise<TOutput>}
     */
    async refresh() {
      if (staleOnRefresh) return refreshPool.get(true);
      return pool.get(true);
    },
  };
};

/**
 * @template {Record<string, Circuit<any,any>>} S
 * @typedef {{[K in keyof S]: Awaited<ReturnType<S[K]['get']>>}} UnwrappedSources
 */

/**
 * @template TOutput
 * @template {Record<string, Circuit<any,any>>} TSources
 * @template {TOutput | undefined} TInitial
 * @typedef {Object} DerivedCircuitOptions
 * @property {string} name``
 * @property {TSources} sources
 * @property {(sources: UnwrappedSources<TSources>) => Promise<TOutput>} deriver
 * @property {TInitial} [initialValue]
 * @property {import('./stores').PersistenceLayer<TOutput>} [store = createMemoryStore()]
 * @property {Object} [logger=console]
 * @property {(a,b) => boolean} [equalityChecker=(a,b)=> a===b]
 */

/**
 * @template {Record<string, Circuit<any,any>>} TSources
 * @template TOutput
 * @template {TOutput | undefined} TInitial
 * @param {DerivedCircuitOptions<TOutput, TSources, TInitial>} options
 * @returns {Circuit<TOutput, TInitial>}
 */
export const createAggregateCircuit = ({
  name,
  sources,
  deriver,
  initialValue,
  store,
  logger,
  equalityChecker,
}) => {
  /** @type {UnwrappedSources<TSources> | undefined} */
  let value = undefined;

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
      value = Object.fromEntries(entries);
      return deriver(value);
    },
  });

  /** @type {((val: TOutput) => void)[]} */
  let subscribers = [];

  /** @type {Array<function>} */
  let sourceUnsubscribers = [];

  return {
    ...circuit,
    async refresh() {
      Object.values(sources).forEach((source) => source.refresh());
      return this.get();
    },
    /**
     * @param {(val: TOutput) => void} fn
     */
    subscribe(fn) {
      const globalUnsubscribe = circuit.subscribe(fn);
      subscribers.push(fn);

      if (sourceUnsubscribers.length === 0) {
        sourceUnsubscribers = Object.entries(sources).map(([k, c]) =>
          c.subscribe(async (v) => {
            if (!value || typeof v === "undefined") return;
            value = { ...value, [k]: v };
            if (Object.values(value).every((v) => v !== undefined)) {
              circuit.set(await deriver(value));
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

// // type safety example
// const a = createCircuit({
//   name: 'a',
//   async getter() {
//     return { total: 1 };
//   },
// });

// const aWithDefault = createCircuit({
//   name: 'aD',
//   initialValue: { total: 0 },
//   async getter() {
//     return { total: 1 };
//   },
// });

// aWithDefault.subscribe((v) => v.total);
// a.subscribe((v) => v.total);

// const b = createCircuit({
//   name: 'b',
//   async getter() {
//     return 10;
//   },
// });

// const c = createAggregateCircuit({
//   name: 'c',
//   sources: { a, b },
//   deriver(sources) {
//     return sources.a.total + sources.b;
//   },
// });

// c.get().then((d) => d);
