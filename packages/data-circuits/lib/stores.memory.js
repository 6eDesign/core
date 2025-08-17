import { createEmitter } from './emitter.js';

const events = [
  {
    eventName: /** @type {const} **/ ('set'),
    data: { key: 'string', value: {} },
  },
  {
    eventName: /** @type {const} **/ ('delete'),
    data: { key: 'string' },
  },
];

/**
 * @template T
 */
export const createMemoryStore = () => {
  const db = {};
  const { emit, on } = createEmitter(events);

  return {
    on,
    /**
     * @param {string} key
     * @returns {Promise<import("./stores.js").WrappedValue<T>>}
     */
    async get(key) {
      return db[key];
    },
    /**
     * @param {string} key
     * @param {import("./stores.js").WrappedValue<T>} value
     * @returns {Promise<void>}
     */
    async set(key, value) {
      db[key] = value;
      emit('set', { key, value });
    },
    /**
     * @param {string} key
     * @returns {Promise<void>}
     */
    async delete(key) {
      delete this.db[key];
      emit('delete', { key });
    },

    subscribe(key, cb) {
      return on('set', (data) => {
        if (data.key !== key) return;
        cb(data);
      });
    },
  };
};
