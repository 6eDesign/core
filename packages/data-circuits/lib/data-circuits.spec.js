import assert from "assert";
import { createCircuit, createAggregateCircuit } from "./circuits.js";
import sinon from "sinon";
import millisecond from "millisecond";
import Client from "ioredis";
import { createRedisStore } from "./stores.js";
import { getDistributedPoolFactory } from "./promisePool.js";

const delay = (dur = 100) => new Promise((res) => setTimeout(res, dur));

const DEFAULT_CIRCUIT_VALUE = 10000;

const storeTypesToOptions = {
  MemoryStore: {
    name: "test",
    getter: async () => {
      await delay();
      return DEFAULT_CIRCUIT_VALUE;
    },
  },
  RedisStore: {
    name: "test",
    getter: async () => {
      await delay();
      return DEFAULT_CIRCUIT_VALUE;
    },
    store: createRedisStore({ namespace: "test", redis: new Client() }),
  },
};

Object.entries(storeTypesToOptions).forEach(
  ([storeType, DEFAULT_CIRCUIT_OPTS]) => {
    describe(`${storeType}`, () => {
      describe("createCircuit(opts)", () => {
        afterEach(async () => {
          sinon.restore();
          const client = new Client();
          await client.flushall();
        });

        it("should create a circuit", async () => {
          const example = createCircuit(DEFAULT_CIRCUIT_OPTS);
        });

        it("should validate options", async () => {
          try {
            // @ts-ignore
            const example = createCircuit({
              name: "example",
            });
            throw new Error("unexpected");
          } catch (e) {
            assert.strictEqual(e.message, "name and getter are required");
          }
        });

        describe("circuit.get()", () => {
          it("should get values", async () => {
            const clock = sinon.useFakeTimers();
            const resolver = sinon.stub().resolves(DEFAULT_CIRCUIT_OPTS);
            const getter = sinon.spy(() => delay(100).then(resolver));
            sinon.spy(DEFAULT_CIRCUIT_OPTS, "getter");

            const example = createCircuit(DEFAULT_CIRCUIT_OPTS);
            const value1Promise = example.get();
            await clock.tickAsync(100);
            const value1 = await value1Promise;

            assert.strictEqual(value1, DEFAULT_CIRCUIT_VALUE);
            assert.strictEqual(DEFAULT_CIRCUIT_OPTS.getter.callCount, 1);

            const value2Promise = example.get();
            await clock.tickAsync(100);
            const value2 = await value2Promise;

            assert.strictEqual(value2, DEFAULT_CIRCUIT_VALUE);
            assert.strictEqual(DEFAULT_CIRCUIT_OPTS.getter.callCount, 2);
          });

          it("should cache values", async () => {
            const bad = 50;
            const opts = {
              ...DEFAULT_CIRCUIT_OPTS,
              getter: sinon.stub().resolves(DEFAULT_CIRCUIT_VALUE),
              bad,
            };

            const example = createCircuit(opts);

            const value1 = await example.get();

            assert.strictEqual(value1, DEFAULT_CIRCUIT_VALUE);
            assert.strictEqual(opts.getter.callCount, 1);

            const value2 = await example.get();
            assert.strictEqual(value2, DEFAULT_CIRCUIT_VALUE);
            assert.strictEqual(opts.getter.callCount, 1);

            await delay(bad);

            const value3 = await example.get();
            assert.strictEqual(value3, DEFAULT_CIRCUIT_VALUE);
            assert.strictEqual(opts.getter.callCount, 2);
          });

          it("should pool promises", async () => {
            const clock = sinon.useFakeTimers();
            const getter = () =>
              new Promise((res) =>
                setTimeout(res.bind(null, DEFAULT_CIRCUIT_VALUE), 100)
              );

            const opts = {
              ...DEFAULT_CIRCUIT_OPTS,
              getter,
            };
            sinon.spy(opts, "getter");

            const example = createCircuit(opts);
            const promises = Promise.all([
              example.get(),
              example.get(),
              example.get(),
            ]);
            await clock.tickAsync(100);
            const values = await promises;

            assert.deepStrictEqual(values, [
              DEFAULT_CIRCUIT_VALUE,
              DEFAULT_CIRCUIT_VALUE,
              DEFAULT_CIRCUIT_VALUE,
            ]);
            assert.strictEqual(opts.getter.callCount, 1);
          });

          it("staleOnRefresh", async () => {
            const getter = sinon.stub().resolves(DEFAULT_CIRCUIT_VALUE);
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
            assert.strictEqual(value1, DEFAULT_CIRCUIT_VALUE);
            assert.strictEqual(getter.callCount, 1);

            await delay(stale);

            getter.resolves(DEFAULT_CIRCUIT_VALUE + 1);
            const value2 = await example.get();
            assert.strictEqual(value2, DEFAULT_CIRCUIT_VALUE);
            assert.strictEqual(getter.callCount, 2);

            await delay(1);
            const value3 = await example.get();
            assert.strictEqual(value3, DEFAULT_CIRCUIT_VALUE + 1);
            assert.strictEqual(getter.callCount, 2);
          });

          it("staleOnError", async () => {
            const getter = sinon.stub().resolves(DEFAULT_CIRCUIT_VALUE);
            const opts = {
              ...DEFAULT_CIRCUIT_OPTS,
              bad: millisecond("30s"),
              stale: millisecond("15s"),
              staleOnError: true,
              getter,
            };
            const clock = sinon.useFakeTimers();
            const example = createCircuit(opts);

            const value1 = await example.get();
            assert.strictEqual(value1, DEFAULT_CIRCUIT_VALUE);
            assert.strictEqual(getter.callCount, 1);

            getter.rejects();
            clock.tick(millisecond("15s") + 1);

            const value2 = await example.get();
            assert.strictEqual(value2, DEFAULT_CIRCUIT_VALUE);
            assert.strictEqual(getter.callCount, 2);

            getter.resolves(DEFAULT_CIRCUIT_VALUE + 1);
            const value3 = await example.get();
            assert.strictEqual(value3, DEFAULT_CIRCUIT_VALUE + 1);
            assert.strictEqual(getter.callCount, 3);
          });

          // todo: add tests to ensure that multiple concurrent calls
          // with a distributed promise store handle failure correctly
          // - in doing so: ensure we're not relying on timeout logic as well
          it("should handle errors appropriately", async () => {
            const getter = sinon.stub().rejects(new Error("foo"));
            const opts = {
              ...DEFAULT_CIRCUIT_OPTS,
              bad: millisecond("30s"),
              stale: millisecond("15s"),
              staleOnError: true,
              getter,
            };
            const clock = sinon.useFakeTimers();
            const example = createCircuit(opts);

            try {
              const value1 = await example.get();
              throw new Error("bar");
            } catch (e) {
              assert.strictEqual(e.message, "foo");
              assert.strictEqual(getter.callCount, 1);

              try {
                const value2 = await example.get();
              } catch (e) {
                assert.strictEqual(e.message, "foo");
                assert.strictEqual(getter.callCount, 2);
              }
            }
          });
        });

        describe("circuit.refresh()", async () => {
          it("should bypass cache", async () => {
            const resolver = sinon.stub().resolves(10);
            const getter = sinon.spy(resolver);
            const example = createCircuit({
              ...DEFAULT_CIRCUIT_OPTS,
              bad: millisecond("30m"),
              getter,
            });

            const val1 = await example.get();
            assert.strictEqual(val1, 10);
            assert.strictEqual(getter.callCount, 1);

            await delay(150);

            const val2 = await example.get();
            assert.strictEqual(val2, 10);
            assert.strictEqual(getter.callCount, 1);

            resolver.resolves(15);
            const val3 = await example.refresh();
            assert.strictEqual(val3, 15);
            assert.strictEqual(getter.callCount, 2);
          });

          it("should attach to existing promise", async () => {
            const clock = sinon.useFakeTimers();
            const getter = sinon.spy(async () =>
              delay(millisecond("3s")).then(() => 15)
            );
            const example = createCircuit({ ...DEFAULT_CIRCUIT_OPTS, getter });

            const initiator = example.get();
            assert.strictEqual(getter.callCount, 1);
            clock.tick(millisecond("300ms"));
            const refresh = example.refresh();
            assert.strictEqual(getter.callCount, 1);

            clock.tick(millisecond("2.7s"));

            const [val1, val2] = await Promise.all([initiator, refresh]);
            assert.strictEqual(val1, val2);
            assert.strictEqual(val1, 15);
            assert.strictEqual(getter.callCount, 1);
          });

          it("get() calls should attach to refresh promise (when staleOnRefresh=false)", async () => {
            const getter = sinon.spy(() =>
              delay(millisecond("130ms")).then(() => 15)
            );
            const example = createCircuit({
              ...DEFAULT_CIRCUIT_OPTS,
              bad: millisecond("30m"),
              getter,
            });

            example.get();

            await delay(50);
            assert.strictEqual(getter.callCount, 1);
            const refreshPromise = example.refresh();

            await delay(50);
            const getPromise = example.get();
            const [val1, val2] = await Promise.all([
              refreshPromise,
              getPromise,
            ]);
            assert.strictEqual(val1, val2);
            assert.strictEqual(val1, 15);
            assert.strictEqual(getter.callCount, 1);
          });

          it("should get stale data during manual refresh() when staleOnRefresh=true", async () => {
            const resolver = sinon.stub().resolves(1);
            const getter = sinon.spy(() => delay(50).then(resolver));

            const circuit = createCircuit({
              ...DEFAULT_CIRCUIT_OPTS,
              getter,
              stale: millisecond("30m"),
              bad: millisecond("1h"),
              staleOnRefresh: true,
            });

            const val = await circuit.get();
            assert.strictEqual(val, 1);

            resolver.resolves(2);

            const [refreshVal, val2] = await Promise.all([
              circuit.refresh(),
              circuit.get(),
            ]);

            assert.strictEqual(refreshVal, 2);
            assert.strictEqual(val2, 1);
          });
        });

        describe("circuit.subscribe()", async () => {
          it("should call subscribers appropriately", async () => {
            const clock = sinon.useFakeTimers();
            const example = createCircuit(DEFAULT_CIRCUIT_OPTS);

            const sub1 = sinon.stub();
            const sub2 = sinon.stub();
            example.subscribe(sub1);
            example.subscribe(sub2);

            assert.strictEqual(sub1.callCount, 1);
            assert.deepStrictEqual(sub1.getCall(0).args, [undefined]);
            assert.strictEqual(sub2.callCount, 1);
            assert.deepStrictEqual(sub2.getCall(0).args, [undefined]);

            await clock.tickAsync(100);
            assert.strictEqual(sub1.callCount, 2);
            assert.deepStrictEqual(sub1.getCall(1).args, [
              DEFAULT_CIRCUIT_VALUE,
            ]);
            assert.strictEqual(sub2.callCount, 2);
            assert.deepStrictEqual(sub2.getCall(1).args, [
              DEFAULT_CIRCUIT_VALUE,
            ]);
          });

          it("should honor equalityChecker option", async () => {
            const val1 = { hello: "world" };
            const val2 = { hello: "world" };
            const getter = sinon.stub().resolves(val1);
            const opts = {
              ...DEFAULT_CIRCUIT_OPTS,
              getter,
              equalityChecker: (a, b) =>
                JSON.stringify(a) === JSON.stringify(b),
            };
            const example = createCircuit(opts);
            const sub = sinon.stub();
            example.subscribe(sub);

            await example.get();

            assert.strictEqual(sub.callCount, 2);
            assert.strictEqual(sub.getCall(1).args[0], val1);

            getter.resolves(val2);
            await example.get();

            assert.strictEqual(sub.callCount, 2);
            assert.strictEqual(sub.getCall(1).args[0], val1);
          });
        });
      });

      describe("createAggregateCircuit()", () => {
        afterEach(async () => {
          sinon.restore();
          const client = new Client();
          await client.flushall();
        });
        it("should derive values", async () => {
          const resolverA = sinon.stub().resolves(10);
          const resolverB = sinon.stub().resolves(5);
          const getterA = sinon.spy(() => delay(20).then(resolverA));
          const getterB = sinon.spy(() => delay(20).then(resolverB));
          const derived = createAggregateCircuit({
            name: "test-derived",
            sources: {
              a: createCircuit({ ...DEFAULT_CIRCUIT_OPTS, getter: getterA }),
              b: createCircuit({
                ...DEFAULT_CIRCUIT_OPTS,
                name: "test-2",
                getter: getterB,
              }),
            },
            deriver(sources) {
              return sources.a + sources.b;
            },
          });
          const val = await derived.get();
          assert.strictEqual(val, 15);
          assert.strictEqual(getterA.callCount, 1);
          assert.strictEqual(getterB.callCount, 1);
        });

        it("should ignore cache options", async () => {
          const getterA = sinon.stub().resolves(10);
          const getterB = sinon.stub().resolves(5);

          const derived = createAggregateCircuit({
            name: "test-derived",
            sources: {
              a: createCircuit({ ...DEFAULT_CIRCUIT_OPTS, getter: getterA }),
              b: createCircuit({
                ...DEFAULT_CIRCUIT_OPTS,
                getter: getterB,
                name: "test-2",
              }),
            },
            deriver(sources) {
              return sources.a + sources.b;
            },
            // @ts-ignore
            bad: millisecond("1d"),
          });

          const val1 = await derived.get();
          assert.strictEqual(val1, 15);
          assert.strictEqual(getterA.callCount, 1);
          assert.strictEqual(getterB.callCount, 1);

          getterA.resolves(5);
          const val2 = await derived.get();
          assert.strictEqual(val2, 10);
          assert.strictEqual(getterA.callCount, 2);
          assert.strictEqual(getterB.callCount, 2);
        });

        it("should subscribe properly", async () => {
          const resolverA = sinon.stub().resolves(1);
          const resolverB = sinon.stub().resolves(2);
          const getterA = sinon.spy(() => delay(50).then(resolverA));
          const getterB = sinon.spy(() => delay(100).then(resolverB));
          const deriver = sinon.spy((sources) => sources.a + sources.b);
          const sub1 = sinon.spy();
          const sub2 = sinon.spy();
          const sources = {
            a: createCircuit({ ...DEFAULT_CIRCUIT_OPTS, getter: getterA }),
            b: createCircuit({
              ...DEFAULT_CIRCUIT_OPTS,
              getter: getterB,
              name: "test-2",
            }),
          };

          const derived = createAggregateCircuit({
            name: "test-derived",
            sources,
            deriver,
          });

          // initial state
          assert.strictEqual(getterA.callCount, 0);
          assert.strictEqual(getterB.callCount, 0);
          assert.strictEqual(deriver.callCount, 0);
          assert.strictEqual(sub1.callCount, 0);

          // add multiple subscribers
          const unsub1 = derived.subscribe(sub1);
          const unsub2 = derived.subscribe(sub2);

          // subscribers are called immediately with current value
          assert.strictEqual(sub1.callCount, 1);
          assert.strictEqual(sub2.callCount, 1);
          assert(sub1.calledWith(undefined));
          assert(sub2.calledWith(undefined));

          // subscription should trigger get on source circuits
          assert.strictEqual(getterA.callCount, 1);
          assert.strictEqual(getterB.callCount, 1);
          assert.strictEqual(deriver.callCount, 0);

          // half of the sources resolve and no new calls should have occurred
          await delay(50);
          assert.strictEqual(getterA.callCount, 1);
          assert.strictEqual(getterB.callCount, 1);
          assert.strictEqual(deriver.callCount, 0);
          assert.strictEqual(sub1.callCount, 1);
          assert.strictEqual(sub2.callCount, 1);

          // all sources have been resolved
          await delay(80);
          // this shouldn't happen.. we need a way to set the value
          assert.strictEqual(getterA.callCount, 1);
          assert.strictEqual(getterB.callCount, 1);
          assert.strictEqual(deriver.callCount, 1);
          assert.strictEqual(sub1.callCount, 2);
          assert.strictEqual(sub2.callCount, 2);
          assert(sub1.getCall(1).calledWith(3));
          assert(sub2.getCall(1).calledWith(3));

          // a source updates externally - aggregate should update as well
          resolverA.resolves(2);
          await sources.a.refresh();
          assert.strictEqual(getterA.callCount, 2);
          assert.strictEqual(getterB.callCount, 1);
          assert.strictEqual(deriver.callCount, 2);
          assert.strictEqual(sub1.callCount, 3);
          assert.strictEqual(sub2.callCount, 3);
          assert(sub1.getCall(2).calledWith(4));
          assert(sub2.getCall(2).calledWith(4));

          // unsubscribe one of our subscribers
          resolverA.resolves(3);
          unsub2();
          await sources.a.refresh();

          assert.strictEqual(getterA.callCount, 3);
          assert.strictEqual(getterB.callCount, 1);
          assert.strictEqual(deriver.callCount, 3);
          assert.strictEqual(sub1.callCount, 4);
          assert.strictEqual(sub2.callCount, 3);
          assert(sub1.getCall(3).calledWith(5));

          // unsubscribe last subscriber during refresh
          resolverA.resolves(4);
          const refreshPromise3 = sources.a.refresh();
          await delay(25);
          unsub1();
          await refreshPromise3;

          assert.strictEqual(getterA.callCount, 4);
          assert.strictEqual(getterB.callCount, 1);
          assert.strictEqual(deriver.callCount, 3);
          assert.strictEqual(sub1.callCount, 4);
          assert.strictEqual(sub2.callCount, 3);
        });

        it("should properly refresh sources", async () => {
          const getterBResolver = sinon.stub().resolves(20);
          const getterA = sinon.spy(() => delay(30).then(() => 10));
          const getterB = sinon.spy(() => delay(50).then(getterBResolver));
          const deriver = sinon.spy((sources) => {
            return sources.a + sources.b;
          });

          const derived = createAggregateCircuit({
            name: "test-derived",
            sources: {
              a: createCircuit({
                ...DEFAULT_CIRCUIT_OPTS,
                getter: getterA,
                bad: millisecond("30m"),
              }),
              b: createCircuit({
                ...DEFAULT_CIRCUIT_OPTS,
                getter: getterB,
                name: "test-2",
                bad: millisecond("30m"),
              }),
            },
            deriver,
          });

          const getVal = await derived.get();
          assert.strictEqual(getVal, 30);
          assert.strictEqual(getterA.callCount, 1);
          assert.strictEqual(getterB.callCount, 1);
          assert.strictEqual(deriver.callCount, 1);

          getterBResolver.resolves(40);
          const refreshVal = await derived.refresh();
          assert.strictEqual(refreshVal, 50);
          assert.strictEqual(getterA.callCount, 2);
          assert.strictEqual(getterB.callCount, 2);
          assert.strictEqual(deriver.callCount, 2);
        });
      });
    });
  }
);

describe("getDistributedPoolFactory()", function () {
  const DEFAULT_CIRCUIT_OPTS = storeTypesToOptions.RedisStore;

  afterEach(async () => {
    sinon.restore();
    const client = new Client();
    await client.flushall();
  });

  it("should coalesce promises for distributed redis clients", async () => {
    const clientA = new Client();
    const clientB = new Client();
    const clientC = new Client();
    const resolver = sinon.stub().resolves({ count: 100 });
    const getter = sinon.spy(() => delay(110).then(resolver));

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

    assert.deepStrictEqual(values[0], { count: 100 });
    assert.deepStrictEqual(values[1], { count: 100 });
    assert.deepStrictEqual(values[2], { count: 100 });
    assert.strictEqual(getter.callCount, 1);

    resolver.resolves({ count: 3000 });
    const nextValues = await Promise.all([
      circuitA.get(),
      circuitB.get(),
      delay(40).then(() => circuitB.get()),
    ]);
    assert.deepStrictEqual(nextValues[0], { count: 3000 });
    assert.deepStrictEqual(nextValues[1], { count: 3000 });
    assert.deepStrictEqual(nextValues[2], { count: 3000 });
    assert.strictEqual(getter.callCount, 2);
  });
});

const getServers = (resolverA, resolverB) =>
  Array.from({ length: 2 }).map(() => {
    const redis = new Client();
    const circuitA = createCircuit({
      name: "a",
      getter: sinon.spy(() => delay(55).then(resolverA)),
      setter: sinon.spy(async (val) => val),
      store: createRedisStore({ namespace: "test", redis }),
      poolCreator: getDistributedPoolFactory(redis),
      bad: millisecond("10m"),
      live: true,
    });
    const circuitB = createCircuit({
      name: "b",
      getter: sinon.spy(() => delay(35).then(resolverB)),
      setter: sinon.spy(async (val) => val),
      store: createRedisStore({ namespace: "test", redis }),
      poolCreator: getDistributedPoolFactory(redis),
      bad: millisecond("10m"),
      live: true,
    });
    const circuitC = createAggregateCircuit({
      name: "c",
      sources: { a: circuitA, b: circuitB },
      deriver(sources) {
        return sources.a + sources.b;
      },
    });
    const circuitD = createAggregateCircuit({
      name: "d",
      sources: { c: circuitC },
      deriver(sources) {
        return sources.c + 1;
      },
    });
    return {
      subscriberA: sinon.spy(),
      subscriberB: sinon.spy(),
      subscriberC: sinon.spy(),
      subscriberD: sinon.spy(),
      circuitA,
      circuitB,
      circuitC,
      circuitD,
    };
  });

describe("live circuits with redis", () => {
  const client = new Client();
  const resolverA = sinon.stub().resolves(10);
  const resolverB = sinon.stub().resolves(20);
  let servers = getServers(resolverA, resolverB);
  beforeEach(async () => {
    servers = getServers(resolverA, resolverB);
    resolverA.reset();
    resolverB.reset();
    resolverA.resolves(10);
    resolverB.resolves(20);
  });

  afterEach(async () => {
    await client.flushall();
    sinon.restore();
  });

  it("should see updates made from separate instances", async function () {
    const unsubs = servers.map((s) => s.circuitA.subscribe(s.subscriberA));

    await delay(250);

    servers.forEach((server) => {
      assert.strictEqual(server.subscriberA.callCount, 2);
      assert(server.subscriberA.firstCall.calledWith(undefined));
      assert(server.subscriberA.lastCall.calledWith(10));
    });

    assert(resolverA.calledOnce);

    // refresh triggers update across servers/clients
    resolverA.resolves(90);
    await servers[0].circuitA.refresh();
    await delay(10);

    servers.forEach((server) => {
      assert.strictEqual(server.subscriberA.callCount, 3);
      assert(server.subscriberA.lastCall.calledWith(90));
    });

    assert(resolverA.calledTwice);

    // set triggers update across servers/clients
    await servers[1].circuitA.set(100);
    await delay(10);

    servers.forEach((server) => {
      assert.strictEqual(server.subscriberA.callCount, 4);
      assert(server.subscriberA.lastCall.calledWith(100));
    });

    assert(resolverA.calledTwice);

    // unsubscribe
    unsubs.forEach((f) => f());

    await servers[0].circuitA.refresh();

    servers.forEach((server) => {
      // subscriber call count did not increase
      assert.strictEqual(server.subscriberA.callCount, 4);
    });
  });

  it("should work with aggregate circuits", async () => {
    const circuitCUnsubs = servers.map((s) =>
      s.circuitC.subscribe(s.subscriberC)
    );
    const circuitDUnsubs = servers.map((s) =>
      s.circuitD.subscribe(s.subscriberD)
    );

    await delay(1250);

    assert.strictEqual(resolverA.callCount, 1);
    assert.strictEqual(resolverB.callCount, 1);
    servers.forEach((s) => {
      assert.strictEqual(s.subscriberC.callCount, 2);
      assert(s.subscriberC.firstCall.calledWith(undefined));
      assert.deepStrictEqual(s.subscriberC.secondCall.firstArg, 30);

      assert.strictEqual(s.subscriberD.callCount, 2);
      assert(s.subscriberD.firstCall.calledWith(undefined));
      assert.deepStrictEqual(s.subscriberD.secondCall.firstArg, 31);
    });

    servers[0].circuitA.set(20);

    await delay(100);
    servers.forEach((s) => {
      assert.strictEqual(s.subscriberC.callCount, 3);
      assert(s.subscriberC.thirdCall.calledWith(40));

      assert.strictEqual(s.subscriberD.callCount, 3);
      assert(s.subscriberD.thirdCall.calledWith(41));
    });

    servers[0].circuitB.set(30);

    await delay(100);
    servers.forEach((s) => {
      assert.strictEqual(s.subscriberC.callCount, 4);
      assert(s.subscriberC.getCall(3).calledWith(50));

      assert.strictEqual(s.subscriberD.callCount, 4);
      assert(s.subscriberD.getCall(3).calledWith(51));
    });
  });
});
