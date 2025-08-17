export class RedisEventBus extends BaseDistributedEventBus {
    /**
     * Creates an instance of RedisEventBus.
     *
     * @param {object} options
     * @param {string} options.redisUrl
     * @memberof RedisEventBus
     */
    constructor(options: {
        redisUrl: string;
    });
    queues: {};
    options: {
        redisUrl: string;
    };
}
import { BaseDistributedEventBus } from './base.js';
