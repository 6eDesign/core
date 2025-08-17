import Queue from 'bull';
import { BaseDistributedEventBus } from './base.js';

export class RedisEventBus extends BaseDistributedEventBus {
  /**
   * Creates an instance of RedisEventBus.
   *
   * @param {object} options
   * @param {string} options.redisUrl
   * @memberof RedisEventBus
   */
  constructor(options) {
    super();
    this.queues = {};
    this.options = options;
  }
  async send(name, msg) {
    this.queues[name] =
      this.queues[name] || new Queue(name, this.options.redisUrl);
    this.queues[name].add(msg);
  }
  async listen(name, fn) {
    this.queues[name] =
      this.queues[name] || new Queue(name, this.options.redisUrl);
    this.queues[name].process(async (job) => {
      try {
        await fn(job.data);
      } catch (error) {
        this.emit('error', error);
        throw error;
      }
    });
  }
}
