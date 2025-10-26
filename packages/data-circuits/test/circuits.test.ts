import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest';
import {
  createCircuit,
  createAggregateCircuit,
  createRedisStore,
  getDistributedPoolFactory,
  CircuitOptions,
  delay,
} from '../src';
import millisecond from 'millisecond';
import Redis from 'ioredis';

const DEFAULT_CIRCUIT_VALUE = 10000;

const storeTypesToOptions: Record<string, CircuitOptions<number, number>> = {
  MemoryStore: {
    name: 'test',
    getter: async () => {
      await delay();
      return DEFAULT_CIRCUIT_VALUE;
    },
  },
  RedisStore: {
    name: 'test',
    getter: async () => {
      await delay();
      return DEFAULT_CIRCUIT_VALUE;
    },
    store: createRedisStore({ namespace: 'test', redis: new Redis() }),
  },
};

Object.entries(storeTypesToOptions).forEach(([storeType, DEFAULT_CIRCUIT_OPTS]) => {
  describe(`${storeType}`, () => {
    describe('createCircuit(opts)', () => {
      afterEach(async () => {
        vi.restoreAllMocks();
        const client = new Redis();
        await client.flushall();
      });

      it('should create a circuit', async () => {
        const example = createCircuit(DEFAULT_CIRCUIT_OPTS);
        expect(example).toBeDefined();
      });

      it('should validate options', async () => {
        try {
          // @ts-ignore
          const example = createCircuit({
            name: 'example',
          });
          throw new Error('unexpected');
        } catch (e: any) {
          expect(e.message).toBe('name and getter are required');
        }
      });

      describe('circuit.get()', () => {
        it('should get values', async () => {
          vi.useFakeTimers();
          const getter = vi.fn(() => delay(100).then(() => DEFAULT_CIRCUIT_VALUE));

          const example = createCircuit({ ...DEFAULT_CIRCUIT_OPTS, getter });
          const value1Promise = example.get();
          await vi.advanceTimersByTimeAsync(100);
          const value1 = await value1Promise;

          expect(value1).toBe(DEFAULT_CIRCUIT_VALUE);
          expect(getter).toHaveBeenCalledTimes(1);

          const value2Promise = example.get();
          await vi.advanceTimersByTimeAsync(100);
          const value2 = await value2Promise;

          expect(value2).toBe(DEFAULT_CIRCUIT_VALUE);
          expect(getter).toHaveBeenCalledTimes(2);
        });

        it('should cache values', async () => {
          vi.useRealTimers();
          const bad = 50;
          const getter = vi.fn().mockResolvedValue(DEFAULT_CIRCUIT_VALUE);
          const opts = {
            ...DEFAULT_CIRCUIT_OPTS,
            getter,
            bad,
          };

          const example = createCircuit(opts);

          const value1 = await example.get();
          expect(value1).toBe(DEFAULT_CIRCUIT_VALUE);
          expect(getter).toHaveBeenCalledTimes(1);

          const value2 = await example.get();
          expect(value2).toBe(DEFAULT_CIRCUIT_VALUE);
          expect(getter).toHaveBeenCalledTimes(1);

          await delay(bad);

          const value3 = await example.get();
          expect(value3).toBe(DEFAULT_CIRCUIT_VALUE);
          expect(getter).toHaveBeenCalledTimes(2);
        });

        it('should pool promises', async () => {
          vi.useFakeTimers();
          const getter = vi.fn(
            () => new Promise((res) => setTimeout(res.bind(null, DEFAULT_CIRCUIT_VALUE), 100))
          );

          const opts = {
            ...DEFAULT_CIRCUIT_OPTS,
            getter,
          };

          const example = createCircuit(opts);
          const promises = Promise.all([example.get(), example.get(), example.get()]);
          await vi.advanceTimersByTimeAsync(100);
          const values = await promises;

          expect(values).toEqual([
            DEFAULT_CIRCUIT_VALUE,
            DEFAULT_CIRCUIT_VALUE,
            DEFAULT_CIRCUIT_VALUE,
          ]);
          expect(getter).toHaveBeenCalledTimes(1);
        });

        it('staleOnRefresh', async () => {
          vi.useRealTimers();
          const getter = vi.fn().mockResolvedValue(DEFAULT_CIRCUIT_VALUE);
          const bad = 80;
          const stale = 40;
          const opts = {
            ...DEFAULT_CIRCUIT_OPTS,
            bad,
            stale,
            staleOnRefresh: true,
            getter,
          };
          const example = createCircuit(opts);

          const value1 = await example.get();
          expect(value1).toBe(DEFAULT_CIRCUIT_VALUE);
          expect(getter).toHaveBeenCalledTimes(1);

          await delay(stale);

          getter.mockResolvedValue(DEFAULT_CIRCUIT_VALUE + 1);
          const value2 = await example.get();
          expect(value2).toBe(DEFAULT_CIRCUIT_VALUE);
          expect(getter).toHaveBeenCalledTimes(2);

          await delay(1);
          const value3 = await example.get();
          expect(value3).toBe(DEFAULT_CIRCUIT_VALUE + 1);
          expect(getter).toHaveBeenCalledTimes(2);
        });

        it('staleOnError', async () => {
          vi.useFakeTimers();
          const getter = vi.fn().mockResolvedValue(DEFAULT_CIRCUIT_VALUE);
          const opts = {
            ...DEFAULT_CIRCUIT_OPTS,
            bad: millisecond('30s'),
            stale: millisecond('15s'),
            staleOnError: true,
            getter,
          };
          const example = createCircuit(opts);

          const value1 = await example.get();
          expect(value1).toBe(DEFAULT_CIRCUIT_VALUE);
          expect(getter).toHaveBeenCalledTimes(1);

          getter.mockRejectedValue(new Error('foo'));
          vi.advanceTimersByTime(millisecond('15s') + 1);

          const value2 = await example.get();
          expect(value2).toBe(DEFAULT_CIRCUIT_VALUE);
          expect(getter).toHaveBeenCalledTimes(2);

          getter.mockResolvedValue(DEFAULT_CIRCUIT_VALUE + 1);
          const value3 = await example.get();
          expect(value3).toBe(DEFAULT_CIRCUIT_VALUE + 1);
          expect(getter).toHaveBeenCalledTimes(3);
        });

        it('should handle errors appropriately', async () => {
          const getter = vi.fn().mockRejectedValue(new Error('foo'));
          const opts = {
            ...DEFAULT_CIRCUIT_OPTS,
            bad: millisecond('30s'),
            stale: millisecond('15s'),
            staleOnError: true,
            getter,
          };
          const example = createCircuit(opts);

          await expect(example.get()).rejects.toThrow('foo');
          expect(getter).toHaveBeenCalledTimes(1);
          await expect(example.get()).rejects.toThrow('foo');
          expect(getter).toHaveBeenCalledTimes(2);
        });

        it('should not fetch from store if in-memory cache is fresh', async () => {
          vi.useRealTimers();
          const store = {
            get: vi.fn().mockResolvedValue({
              data: DEFAULT_CIRCUIT_VALUE,
              stale: Date.now() + 10000,
              bad: Date.now() + 20000,
            }),
            set: vi.fn(),
            delete: vi.fn(),
            on: vi.fn(),
            subscribe: vi.fn(),
          };
          const opts = {
            ...DEFAULT_CIRCUIT_OPTS,
            stale: 10000,
            bad: 1,
            store,
          };

          const example = createCircuit(opts);

          await example.get();
          expect(store.get).toHaveBeenCalledTimes(1);

          await example.get();
          expect(store.get).toHaveBeenCalledTimes(1);
        });
      });

      describe('circuit.refresh()', async () => {
        it('should bypass cache', async () => {
          vi.useRealTimers();
          const resolver = vi.fn().mockResolvedValue(10);
          const getter = vi.fn(resolver);
          const example = createCircuit({
            ...DEFAULT_CIRCUIT_OPTS,
            bad: millisecond('30m'),
            getter,
          });

          const val1 = await example.get();
          expect(val1).toBe(10);
          expect(getter).toHaveBeenCalledTimes(1);

          await delay(150);

          const val2 = await example.get();
          expect(val2).toBe(10);
          expect(getter).toHaveBeenCalledTimes(1);

          resolver.mockResolvedValue(15);
          const val3 = await example.refresh();
          expect(val3).toBe(15);
          expect(getter).toHaveBeenCalledTimes(2);
        });

        it('should attach to existing promise', async () => {
          vi.useFakeTimers();
          const getter = vi.fn(async () => delay(millisecond('3s')).then(() => 15));
          const example = createCircuit({ ...DEFAULT_CIRCUIT_OPTS, getter });

          const initiator = example.get();
          expect(getter).toHaveBeenCalledTimes(1);
          vi.advanceTimersByTime(millisecond('300ms'));
          const refresh = example.refresh();
          expect(getter).toHaveBeenCalledTimes(1);

          vi.advanceTimersByTime(millisecond('2.7s'));

          const [val1, val2] = await Promise.all([initiator, refresh]);
          expect(val1).toBe(val2);
          expect(val1).toBe(15);
          expect(getter).toHaveBeenCalledTimes(1);
        });

        it('get() calls should attach to refresh promise (when staleOnRefresh=false)', async () => {
          vi.useRealTimers();
          const getter = vi.fn(() => delay(millisecond('130ms')).then(() => 15));
          const example = createCircuit({
            ...DEFAULT_CIRCUIT_OPTS,
            bad: millisecond('30m'),
            getter,
          });

          example.get();

          await delay(50);
          expect(getter).toHaveBeenCalledTimes(1);
          const refreshPromise = example.refresh();

          await delay(50);
          const getPromise = example.get();
          const [val1, val2] = await Promise.all([refreshPromise, getPromise]);
          expect(val1).toBe(val2);
          expect(val1).toBe(15);
          expect(getter).toHaveBeenCalledTimes(1);
        });

        it('should get stale data during manual refresh() when staleOnRefresh=true', async () => {
          vi.useRealTimers();
          const resolver = vi.fn().mockResolvedValue(1);
          const getter = vi.fn(() => delay(50).then(() => resolver()));

          const circuit = createCircuit({
            ...DEFAULT_CIRCUIT_OPTS,
            getter,
            stale: millisecond('30m'),
            bad: millisecond('1h'),
            staleOnRefresh: true,
          });

          const val = await circuit.get();
          expect(val).toBe(1);

          resolver.mockResolvedValue(2);

          const [refreshVal, val2] = await Promise.all([circuit.refresh(), circuit.get()]);

          expect(refreshVal).toBe(2);
          expect(val2).toBe(1);
        });
      });

      describe('circuit.subscribe()', () => {
        it('should call subscribers appropriately', async () => {
          vi.useFakeTimers();
          const getter = vi.fn().mockResolvedValue(DEFAULT_CIRCUIT_VALUE);
          const example = createCircuit({ ...DEFAULT_CIRCUIT_OPTS, getter });

          const sub1 = vi.fn();
          const sub2 = vi.fn();
          example.subscribe(sub1);
          example.subscribe(sub2);

          expect(sub1).toHaveBeenCalledTimes(1);
          expect(sub1).toHaveBeenCalledWith(undefined);
          expect(sub2).toHaveBeenCalledTimes(1);
          expect(sub2).toHaveBeenCalledWith(undefined);

          await vi.advanceTimersByTimeAsync(100);
          await example.get();

          expect(sub1).toHaveBeenCalledTimes(2);
          expect(sub1).toHaveBeenCalledWith(DEFAULT_CIRCUIT_VALUE);
          expect(sub2).toHaveBeenCalledTimes(2);
          expect(sub2).toHaveBeenCalledWith(DEFAULT_CIRCUIT_VALUE);
        });

        it('should honor equalityChecker option', async () => {
          const val1 = { hello: 'world' };
          const val2 = { hello: 'world' };
          const getter = vi.fn().mockResolvedValue(val1);
          const opts = {
            ...DEFAULT_CIRCUIT_OPTS,
            getter,
            equalityChecker: (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b),
          };
          const example = createCircuit(opts as any);
          const sub = vi.fn();
          example.subscribe(sub);

          await example.get();

          expect(sub).toHaveBeenCalledTimes(2);
          expect(sub).toHaveBeenLastCalledWith(val1);

          getter.mockResolvedValue(val2);
          await example.get();

          expect(sub).toHaveBeenCalledTimes(2);
        });
      });
    });

    describe('createAggregateCircuit()', () => {
      afterEach(async () => {
        vi.restoreAllMocks();
        const client = new Redis();
        await client.flushall();
      });
      it('should derive values', async () => {
        vi.useRealTimers();
        const resolverA = vi.fn().mockResolvedValue(10);
        const resolverB = vi.fn().mockResolvedValue(5);
        const getterA = vi.fn(() => delay(20).then(resolverA));
        const getterB = vi.fn(() => delay(20).then(resolverB));
        const derived = createAggregateCircuit({
          name: 'test-derived',
          sources: {
            a: createCircuit({ ...DEFAULT_CIRCUIT_OPTS, getter: getterA }),
            b: createCircuit({
              ...DEFAULT_CIRCUIT_OPTS,
              name: 'test-2',
              getter: getterB,
            }),
          },
          async deriver(sources) {
            return sources.a + sources.b;
          },
        });
        const val = await derived.get();
        expect(val).toBe(15);
        expect(getterA).toHaveBeenCalledTimes(1);
        expect(getterB).toHaveBeenCalledTimes(1);
      });

      it('should ignore cache options', async () => {
        vi.useRealTimers();
        const getterA = vi.fn().mockResolvedValue(10);
        const getterB = vi.fn().mockResolvedValue(5);

        const derived = createAggregateCircuit({
          name: 'test-derived',
          sources: {
            a: createCircuit({ ...DEFAULT_CIRCUIT_OPTS, getter: getterA }),
            b: createCircuit({
              ...DEFAULT_CIRCUIT_OPTS,
              getter: getterB,
              name: 'test-2',
            }),
          },
          async deriver(sources) {
            return sources.a + sources.b;
          },
          // @ts-ignore
          bad: millisecond('1d'),
        });

        const val1 = await derived.get();
        expect(val1).toBe(15);
        expect(getterA).toHaveBeenCalledTimes(1);
        expect(getterB).toHaveBeenCalledTimes(1);

        getterA.mockResolvedValue(5);
        const val2 = await derived.get();
        expect(val2).toBe(10);
        expect(getterA).toHaveBeenCalledTimes(2);
        expect(getterB).toHaveBeenCalledTimes(2);
      });

      it('should subscribe properly', async () => {
        vi.useRealTimers();
        const resolverA = vi.fn().mockResolvedValue(1);
        const resolverB = vi.fn().mockResolvedValue(2);
        const getterA = vi.fn(() => delay(50).then(resolverA));
        const getterB = vi.fn(() => delay(100).then(resolverB));
        const deriver = vi.fn(async (sources) => sources.a + sources.b);
        const sub1 = vi.fn();
        const sub2 = vi.fn();
        const sources = {
          a: createCircuit({ ...DEFAULT_CIRCUIT_OPTS, getter: getterA }),
          b: createCircuit({
            ...DEFAULT_CIRCUIT_OPTS,
            getter: getterB,
            name: 'test-2',
          }),
        };

        const derived = createAggregateCircuit({
          name: 'test-derived',
          sources,
          deriver,
        });

        // initial state
        expect(getterA).toHaveBeenCalledTimes(0);
        expect(getterB).toHaveBeenCalledTimes(0);
        expect(deriver).toHaveBeenCalledTimes(0);
        expect(sub1).toHaveBeenCalledTimes(0);

        // add multiple subscribers
        const unsub1 = derived.subscribe(sub1);
        const unsub2 = derived.subscribe(sub2);

        // subscribers are called immediately with current value
        expect(sub1).toHaveBeenCalledTimes(1);
        expect(sub2).toHaveBeenCalledTimes(1);
        expect(sub1).toHaveBeenCalledWith(undefined);
        expect(sub2).toHaveBeenCalledWith(undefined);

        // subscription should trigger get on source circuits
        expect(getterA).toHaveBeenCalledTimes(1);
        expect(getterB).toHaveBeenCalledTimes(1);
        expect(deriver).toHaveBeenCalledTimes(0);

        // half of the sources resolve and no new calls should have occurred
        await delay(50);
        expect(getterA).toHaveBeenCalledTimes(1);
        expect(getterB).toHaveBeenCalledTimes(1);
        expect(deriver).toHaveBeenCalledTimes(0);
        expect(sub1).toHaveBeenCalledTimes(1);
        expect(sub2).toHaveBeenCalledTimes(1);

        // all sources have been resolved
        await delay(80);
        expect(getterA).toHaveBeenCalledTimes(1);
        expect(getterB).toHaveBeenCalledTimes(1);
        expect(deriver).toHaveBeenCalledTimes(1);
        expect(sub1).toHaveBeenCalledTimes(2);
        expect(sub2).toHaveBeenCalledTimes(2);
        expect(sub1).toHaveBeenLastCalledWith(3);
        expect(sub2).toHaveBeenLastCalledWith(3);

        // a source updates externally - aggregate should update as well
        resolverA.mockResolvedValue(2);
        await sources.a.refresh();
        expect(getterA).toHaveBeenCalledTimes(2);
        expect(getterB).toHaveBeenCalledTimes(1);
        expect(deriver).toHaveBeenCalledTimes(2);
        expect(sub1).toHaveBeenCalledTimes(3);
        expect(sub2).toHaveBeenCalledTimes(3);
        expect(sub1).toHaveBeenLastCalledWith(4);
        expect(sub2).toHaveBeenLastCalledWith(4);

        // unsubscribe one of our subscribers
        resolverA.mockResolvedValue(3);
        unsub2();
        await sources.a.refresh();

        expect(getterA).toHaveBeenCalledTimes(3);
        expect(getterB).toHaveBeenCalledTimes(1);
        expect(deriver).toHaveBeenCalledTimes(3);
        expect(sub1).toHaveBeenCalledTimes(4);
        expect(sub2).toHaveBeenCalledTimes(3);
        expect(sub1).toHaveBeenLastCalledWith(5);

        // unsubscribe last subscriber during refresh
        resolverA.mockResolvedValue(4);
        const refreshPromise3 = sources.a.refresh();
        await delay(25);
        unsub1();
        await refreshPromise3;

        expect(getterA).toHaveBeenCalledTimes(4);
        expect(getterB).toHaveBeenCalledTimes(1);
        expect(deriver).toHaveBeenCalledTimes(3);
        expect(sub1).toHaveBeenCalledTimes(4);
        expect(sub2).toHaveBeenCalledTimes(3);
      });

      it('should properly refresh sources', async () => {
        vi.useRealTimers();
        const getterBResolver = vi.fn().mockResolvedValue(20);
        const getterA = vi.fn(() => delay(30).then(() => 10));
        const getterB = vi.fn(() => delay(50).then(getterBResolver));
        const deriver = vi.fn(async (sources) => {
          return sources.a + sources.b;
        });

        const derived = createAggregateCircuit({
          name: 'test-derived',
          sources: {
            a: createCircuit({
              ...DEFAULT_CIRCUIT_OPTS,
              getter: getterA,
              bad: millisecond('30m'),
            }),
            b: createCircuit({
              ...DEFAULT_CIRCUIT_OPTS,
              getter: getterB,
              name: 'test-2',
              bad: millisecond('30m'),
            }),
          },
          deriver,
        });

        const getVal = await derived.get();
        expect(getVal).toBe(30);
        expect(getterA).toHaveBeenCalledTimes(1);
        expect(getterB).toHaveBeenCalledTimes(1);
        expect(deriver).toHaveBeenCalledTimes(1);

        getterBResolver.mockResolvedValue(40);
        const refreshVal = await derived.refresh();
        expect(refreshVal).toBe(50);
        expect(getterA).toHaveBeenCalledTimes(2);
        expect(getterB).toHaveBeenCalledTimes(2);
        expect(deriver).toHaveBeenCalledTimes(2);
      });
    });
  });
});

describe('getDistributedPoolFactory()', () => {
  const DEFAULT_CIRCUIT_OPTS = storeTypesToOptions.RedisStore;

  afterEach(async () => {
    vi.restoreAllMocks();
    const client = new Redis();
    await client.flushall();
  });

  it('should coalesce promises for distributed redis clients', async () => {
    const clientA = new Redis();
    const clientB = new Redis();
    const resolver = vi.fn().mockResolvedValue({ count: 100 });
    const getter = vi.fn(() => delay(110).then(resolver));

    const circuitA = createCircuit({
      ...DEFAULT_CIRCUIT_OPTS,
      getter,
      poolCreator: getDistributedPoolFactory(clientA),
    });

    const circuitB = createCircuit({
      ...DEFAULT_CIRCUIT_OPTS,
      getter,
      poolCreator: getDistributedPoolFactory(clientB),
    });

    const values = await Promise.all([
      circuitA.get(),
      circuitB.get(),
      delay(40).then(() => circuitB.get()),
    ]);

    expect(values[0]).toEqual({ count: 100 });
    expect(values[1]).toEqual({ count: 100 });
    expect(values[2]).toEqual({ count: 100 });
    expect(getter).toHaveBeenCalledTimes(1);

    resolver.mockResolvedValue({ count: 3000 });
    const nextValues = await Promise.all([
      circuitA.get(),
      circuitB.get(),
      delay(40).then(() => circuitB.get()),
    ]);
    expect(nextValues[0]).toEqual({ count: 3000 });
    expect(nextValues[1]).toEqual({ count: 3000 });
    expect(nextValues[2]).toEqual({ count: 3000 });
    expect(getter).toHaveBeenCalledTimes(2);
  });
});

const getServers = (resolverA: any, resolverB: any) =>
  Array.from({ length: 2 }).map(() => {
    const redis = new Redis();
    const circuitA = createCircuit({
      name: 'a',
      getter: vi.fn(() => delay(55).then(resolverA)),
      setter: vi.fn(async (val) => val),
      store: createRedisStore({ namespace: 'test', redis }),
      poolCreator: getDistributedPoolFactory(redis),
      bad: millisecond('10m'),
      live: true,
    });
    const circuitB = createCircuit({
      name: 'b',
      getter: vi.fn(() => delay(35).then(resolverB)),
      setter: vi.fn(async (val) => val),
      store: createRedisStore({ namespace: 'test', redis }),
      poolCreator: getDistributedPoolFactory(redis),
      bad: millisecond('10m'),
      live: true,
    });
    const circuitC = createAggregateCircuit({
      name: 'c',
      sources: { a: circuitA, b: circuitB },
      async deriver(sources) {
        return sources.a + sources.b;
      },
    });
    const circuitD = createAggregateCircuit({
      name: 'd',
      sources: { c: circuitC },
      async deriver(sources) {
        return sources.c + 1;
      },
    });
    return {
      subscriberA: vi.fn(),
      subscriberB: vi.fn(),
      subscriberC: vi.fn(),
      subscriberD: vi.fn(),
      circuitA,
      circuitB,
      circuitC,
      circuitD,
    };
  });

describe('live circuits with redis', () => {
  const client = new Redis();
  const resolverA = vi.fn().mockResolvedValue(10);
  const resolverB = vi.fn().mockResolvedValue(20);
  let servers = getServers(resolverA, resolverB);
  beforeEach(async () => {
    servers = getServers(resolverA, resolverB);
    resolverA.mockClear();
    resolverB.mockClear();
    resolverA.mockResolvedValue(10);
    resolverB.mockResolvedValue(20);
  });

  afterEach(async () => {
    await client.flushall();
    vi.restoreAllMocks();
  });

  it('should see updates made from separate instances', async function () {
    const unsubs = servers.map((s) => s.circuitA.subscribe(s.subscriberA));

    await delay(250);

    servers.forEach((server) => {
      expect(server.subscriberA).toHaveBeenCalledTimes(2);
      expect(server.subscriberA).toHaveBeenNthCalledWith(1, undefined);
      expect(server.subscriberA).toHaveBeenNthCalledWith(2, 10);
    });

    expect(resolverA).toHaveBeenCalledTimes(1);

    // refresh triggers update across servers/clients
    resolverA.mockResolvedValue(90);
    await servers[0].circuitA.refresh();
    await delay(10);

    servers.forEach((server) => {
      expect(server.subscriberA).toHaveBeenCalledTimes(3);
      expect(server.subscriberA).toHaveBeenLastCalledWith(90);
    });

    expect(resolverA).toHaveBeenCalledTimes(2);

    // set triggers update across servers/clients
    await servers[1].circuitA.set(100);
    await delay(10);

    servers.forEach((server) => {
      expect(server.subscriberA).toHaveBeenCalledTimes(4);
      expect(server.subscriberA).toHaveBeenLastCalledWith(100);
    });

    expect(resolverA).toHaveBeenCalledTimes(2);

    // unsubscribe
    unsubs.forEach((f) => f());

    await servers[0].circuitA.refresh();

    servers.forEach((server) => {
      // subscriber call count did not increase
      expect(server.subscriberA).toHaveBeenCalledTimes(4);
    });
  });

  it('should work with aggregate circuits', async () => {
    const circuitCUnsubs = servers.map((s) => s.circuitC.subscribe(s.subscriberC));
    const circuitDUnsubs = servers.map((s) => s.circuitD.subscribe(s.subscriberD));

    await delay(1250);

    expect(resolverA).toHaveBeenCalledTimes(1);
    expect(resolverB).toHaveBeenCalledTimes(1);
    servers.forEach((s) => {
      expect(s.subscriberC).toHaveBeenCalledTimes(2);
      expect(s.subscriberC).toHaveBeenNthCalledWith(1, undefined);
      expect(s.subscriberC).toHaveBeenNthCalledWith(2, 30);

      expect(s.subscriberD).toHaveBeenCalledTimes(2);
      expect(s.subscriberD).toHaveBeenNthCalledWith(1, undefined);
      expect(s.subscriberD).toHaveBeenNthCalledWith(2, 31);
    });

    servers[0].circuitA.set(20);

    await delay(100);
    servers.forEach((s) => {
      expect(s.subscriberC).toHaveBeenCalledTimes(3);
      expect(s.subscriberC).toHaveBeenLastCalledWith(40);

      expect(s.subscriberD).toHaveBeenCalledTimes(3);
      expect(s.subscriberD).toHaveBeenLastCalledWith(41);
    });

    servers[0].circuitB.set(30);

    await delay(100);
    servers.forEach((s) => {
      expect(s.subscriberC).toHaveBeenCalledTimes(4);
      expect(s.subscriberC).toHaveBeenLastCalledWith(50);

      expect(s.subscriberD).toHaveBeenCalledTimes(4);
      expect(s.subscriberD).toHaveBeenLastCalledWith(51);
    });
  });
});