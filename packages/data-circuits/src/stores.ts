
import { Redis } from 'ioredis';
import { createEmitter, EventDefinition } from './emitter';
import { createPool } from './promisePools.memory';
import { delayedReject } from './delay';

export interface WrappedValue<T> {
  bad: number;
  stale: number;
  data: T;
}

export interface PersistenceLayer<T> {
  get(key: string): Promise<WrappedValue<T> | undefined>;
  set(key: string, value: WrappedValue<T>): Promise<void>;
  delete(key: string): Promise<void>;
  on<TEventName extends (typeof storeEvents)[number]['eventName']>(
    eventName: TEventName,
    fn: (data: Extract<(typeof storeEvents)[number], { eventName: TEventName }>['data']) => void
  ): () => void;
  subscribe(key: string, cb: (val: WrappedValue<T>) => void): () => void;
}

const storeEvents = [
  {
    eventName: 'set' as const,
    data: { key: 'string', value: {} as WrappedValue<any> },
  },
  {
    eventName: 'delete' as const,
    data: { key: 'string' },
  },
];

interface StreamConsumerOptions<T> {
  client: Redis;
  key: string;
  cb: (val: WrappedValue<T>) => void;
  timeout?: number;
}

const streamConsumer = <T>(options: StreamConsumerOptions<T>) => {
  let active = false;

  const watch = async (lastId = '$') => {
    const result = await options.client.xread(
      'BLOCK',
      options.timeout ?? 0,
      'STREAMS',
      options.key,
      lastId
    );

    // TODO: This is a bit of a hack to handle the type from ioredis
    const [[, [[messageId, [, value]]]]] = result as [string, [string, string[]][]][];

    options.client.xtrim(options.key, 'MINID', messageId);
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

interface RedisStoreOptions {
  namespace?: string;
  redis: Redis;
  timeout?: number;
}

export const createRedisStore = <T>({  namespace = 'default',  redis,  timeout = 50,}: RedisStoreOptions): PersistenceLayer<T> => {
  const { emit, on } = createEmitter(storeEvents);
  const pub = redis;
  const sub = redis.duplicate();
  const getNamespacedKey = (key: string) => `${namespace}:${key}`;

  interface StreamConsumerItem {
    subscribers: ((val: WrappedValue<T>) => void)[];
    consumer: ReturnType<typeof streamConsumer>;
  }

  const streamConsumers: { [key: string]: StreamConsumerItem } = {};

  return {
    on,

    async get(key: string): Promise<WrappedValue<T> | undefined> {
      try {
        const result = await Promise.race([
          sub.xrevrange(getNamespacedKey(key), '+', '-', 'COUNT', 1),
          delayedReject(timeout),
        ]);
        // TODO: This is a bit of a hack to handle the type from ioredis
        const [[, value]] = result as [string, string[]][];
        return JSON.parse(value[1]) as WrappedValue<T>;
      } catch (e) {
        throw e;
      }
    },

    async set(key: string, value: WrappedValue<T>): Promise<void> {
      const rKey = getNamespacedKey(key);
      await pub.xadd(rKey, '*', 'key', JSON.stringify(value));
      await pub.xtrim(rKey, 'MAXLEN', 1);
      await pub.expire(rKey, Math.ceil((value.bad - Date.now()) / 1000));
      emit('set', { key, value });
    },

    async delete(key: string): Promise<void> {
      await redis.del(getNamespacedKey(key));
      emit('delete', { key });
    },

    subscribe(key: string, cb: (val: WrappedValue<T>) => void): () => void {
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
