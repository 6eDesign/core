import Redlock from "redlock";
import Client from "ioredis";

/**
 * @param {Client} redisClient
 */
export const getDistributedPoolFactory =
  (redisClient) =>
  /**
   * @template {import('./promisePools.memory.js').PoolPromise} T
   * @param {T} prom
   * @param {import('./promisePools.memory.js').PoolOptions} options
   */
  (prom, { id, timeout = 5000 }) => {
    let promise = undefined;
    const streamId = `${id}-stream`;
    // @ts-ignore
    const redlock = new Redlock([redisClient], {
      retryCount: 0,
    });

    redisClient
      .xgroup("CREATE", streamId, `${streamId}_g`, "$", "MKSTREAM")
      .catch((e) => {
        // there is no reliable way to detect if a stream exists - ignore "already exists" errors
        console.log("todo: ", e?.message);
      });

    const publisher = redisClient.duplicate();

    /** @returns {Promise<Redlock.Lock> | undefined} */
    const getLock = () =>
      redlock.acquire([id], timeout).catch((e) => undefined);

    const subscribeForUpdate = async (start) => {
      console.log(`starting ${streamId} race`);
      const { messageId, value } = await redisClient
        .xread("BLOCK", timeout, "STREAMS", streamId, start)
        .then((d) => {
          console.log(`xread ${streamId}`, d);
          return d;
        })
        .then(([[, [[messageId, [, value]]]]]) => ({ messageId, value }))
        .catch((e) => {
          console.error("error encountered", e);
          return subscribeForUpdate();
        });

      await redisClient.xtrim(streamId, "MINID", messageId);
      return JSON.parse(value);
    };
    return {
      /**
       * @param {Parameters<T>} args
       * @returns {Promise<ReturnType<T>>}
       */
      async get(...args) {
        if (promise) return promise;
        const start = Date.now();

        promise = getLock()
          .then(async (lock) => {
            // console.log(`subscribing for key ${id} w/ lock? ${lock}`);

            if (lock) {
              console.log("running promise", streamId);
              const v = await prom(...args);
              // console.log(`adding to stream "${streamId}" ${v}`);
              await publisher.xadd(streamId, "*", "key", JSON.stringify(v));
              await publisher.xtrim(streamId, "MAXLEN", 1);
              await redlock.release(lock).catch((e) => {
                console.error("error releaing redlock", e);
              });
              return v;
            }

            return subscribeForUpdate(start).then((v) => {
              console.log(`received for key ${id}`, v);
              return v;
            });
          })
          .then(async (d) => {
            if (promise) promise = undefined;
            return d;
          });

        return promise;
      },
    };
  };
