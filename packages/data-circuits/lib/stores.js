import Client from "ioredis";
import { createEmitter } from "./emitter.js";
import { createPool } from "./promisePools.memory.js";
import { delayedReject } from "./delay.js";

/**
 * @template T
 * @typedef {Object} WrappedValue
 * @property {number} bad
 * @property {number} stale
 * @property {T} data
 */

/**
 * @template T
 * @typedef {object} PersistenceLayer
 * @property {(key: string) => Promise<WrappedValue<T>|undefined} get
 * @property {(key: string, value: WrappedValue<T>) => Promise<void>} set
 * @property {(key: string) => Promise<void>} delete
 * @property {(eventName: string, data: any) => () => void} on
 * @property {(key: string, cb: (val: WrappedValue<T>) => void) => () => void} subscribe
 */

const events = [
  {
    eventName: /** @type {const} **/ ("set"),
    data: { key: "string", value: {} },
  },
  {
    eventName: /** @type {const} **/ ("delete"),
    data: { key: "string" },
  },
];

/**
 * @template T
 * @param {object} options
 * @param {Client} options.client
 * @param {string} options.key
 * @param {(val: WrappedValue<T>) => void} options.cb
 * @param {number} [options.timeout]
 */
const streamConsumer = (options) => {
  let active = false;

  const watch = async (lastId = "$") => {
    const [[, [[messageId, [, value]]]]] = await options.client.xread(
      "BLOCK",
      options.timeout ?? 0,
      "STREAMS",
      options.key,
      lastId
    );
    options.client.xtrim(options.key, "MINID", messageId);
    if (!active) return;
    options.cb(JSON.parse(value));
    return watch(messageId);
  };

  const pool = createPool(watch, { id: `promise-${options.key}` });

  return {
    start() {
      active = true;
      pool.get();
    },
    stop() {
      active = false;
    },
  };
};

/**
 * @template T
 * @param {object} options
 * @param {string} [options.namespace]
 * @param {Client} [options.redis]
 * @param {number} [options.timeout]
 * @returns {PersistenceLayer<T>}
 */
export const createRedisStore = ({
  namespace = "default",
  redis,
  timeout = 50,
}) => {
  const { emit, on } = createEmitter(events);
  const pub = redis;
  const sub = redis.duplicate();
  const getNamespacedKey = (key) => `${namespace}:${key}`;

  /**
   * @typedef {object} StreamConsumer
   * @property {((val: WrappedValue<T>) => void)[]} subscribers
   * @property {ReturnType<streamConsumer>} consumer
   */

  /** @type {Record<string, { subscribers: ((val: WrappedValue<T>) => void)[], consumer: ReturnType<streamConsumer>}>} */
  const streamConsumers = {};

  return {
    on,

    /** @type {PersistenceLayer<T>['get']} */
    async get(key) {
      try {
        const [[, [, value]]] = await Promise.race([
          sub.xrevrange(getNamespacedKey(key), "+", "-", "COUNT", 1),
          delayedReject(timeout),
        ]);
        return JSON.parse(value);
      } catch (e) {
        throw e;
      }
    },

    /** @type {PersistenceLayer<T>['set']} */
    async set(key, value) {
      const rKey = getNamespacedKey(key);
      await pub.xadd(rKey, "*", "key", JSON.stringify(value));
      await pub.xtrim(rKey, "MAXLEN", 1);
      await pub.expire(rKey, Math.ceil((value.bad - Date.now()) / 1000));
      emit("set", { key, value });
    },

    /** @type {PersistenceLayer<T>['delete']} */
    async delete(key) {
      await redis.del(getNamespacedKey(key));
      emit("delete", { key });
    },

    subscribe(key, cb) {
      if (!streamConsumers[key]) {
        streamConsumers[key] = {
          subscribers: [],
          consumer: streamConsumer({
            client: sub,
            key: getNamespacedKey(key),
            cb(val) {
              streamConsumers[key].subscribers.forEach((fn) => fn(val));
            },
          }),
        };
      }

      streamConsumers[key].subscribers.push(cb);
      if (streamConsumers[key].subscribers.length === 1) {
        streamConsumers[key].consumer.start();
      }

      return () => {
        streamConsumers[key].subscribers = streamConsumers[
          key
        ].subscribers.filter((fn) => fn !== cb);
        if (!streamConsumers[key].subscribers.length) {
          streamConsumers[key].consumer.stop();
        }
      };
    },
  };
};
