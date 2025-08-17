export function getDistributedPoolFactory(redisClient: Client): <T extends import("./promisePools.memory.js").PoolPromise>(prom: T, { id, timeout }: import("./promisePools.memory.js").PoolOptions) => {
    /**
     * @param {Parameters<T>} args
     * @returns {Promise<ReturnType<T>>}
     */
    get(...args: Parameters<T>): Promise<ReturnType<T>>;
};
import Client from "ioredis";
