
import Redlock from 'redlock';
import { Redis } from 'ioredis';
import { PoolPromise, PoolOptions, Pool } from './promisePools.memory';

export const getDistributedPoolFactory = (redisClient: Redis) => <T extends PoolPromise>(
  prom: T,
  { id, timeout = 5000 }: PoolOptions
): Pool<T> => {
  let promise: ReturnType<T> | undefined = undefined;
  const streamId = `${id}-stream`;
  const redlock = new Redlock([redisClient], {
    retryCount: 0,
  });

  redisClient
    .xgroup('CREATE', streamId, `${streamId}_g`, '$', 'MKSTREAM')
    .catch((_e) => {
      // Ignore errors if the stream already exists
    });

  const publisher = redisClient.duplicate();

  const getLock = (): Promise<Redlock.Lock> | undefined =>
    redlock.acquire([id], timeout).catch(() => undefined);

  const subscribeForUpdate = async (start: number): Promise<any> => {
    try {
      const result = await redisClient.xread(
        'BLOCK',
        timeout,
        'STREAMS',
        streamId,
        start
      );
      // TODO: This is a bit of a hack to handle the type from ioredis
      const [[, [[messageId, [, value]]]]] = result as [string, [string, string[]][]][];
      await redisClient.xtrim(streamId, 'MINID', messageId);
      return JSON.parse(value);
    } catch (e) {
      return subscribeForUpdate(start);
    }
  };

  return {
    async get(...args: Parameters<T>): Promise<ReturnType<T>> {
      if (promise) return promise;
      const start = Date.now();

      promise = getLock()
        .then(async (lock) => {
          if (lock) {
            const v = await prom(...args);
            await publisher.xadd(streamId, '*', 'key', JSON.stringify(v));
            await publisher.xtrim(streamId, 'MAXLEN', 1);
            await redlock.release(lock).catch(() => {});
            return v;
          }

          return subscribeForUpdate(start);
        })
        .then((d) => {
          if (promise) promise = undefined;
          return d;
        }) as ReturnType<T>;

      return promise;
    },
  };
};
