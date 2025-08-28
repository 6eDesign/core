export function getDistributedPoolFactory(redisClient: Client): (prom: T, { id, timeout }: import("./promisePools.memory").PoolOptions) => {
    /**
     * @param {Parameters<T>} args
     * @returns {Promise<ReturnType<T>>}
     */
    get(...args: Parameters<T>): Promise<ReturnType<T>>;
};
import Client from 'ioredis';
