/**
 * @typedef {object} PoolOptions
 * @property {string} id unique identifier
 * @property {number} [timeout]
 */

/**
 * @typedef {(...args: any[]) => Promise<any>} PoolPromise
 */

/**
 * @template {PoolPromise} T
 * @typedef {object} Pool
 * @property {(...args: Parameters<T>) => ReturnType<T>} get
 */

/**
 * @template {PoolPromise} T
 * @typedef {(prom: PoolPromise, opts: PoolOptions) => Pool<T>} PoolCreator
 */

/**
 * Creates a pool for a single promise-returning function
 *
 * @template {PoolPromise} T
 * @param {T} prom
 * @param {PoolOptions} object
 */
export const createPool = (prom, { id }) => {
  let promise = undefined;
  return {
    /**
     * @param {Parameters<T>} args
     * @returns {ReturnType<T>}
     */
    get(...args) {
      if (!promise) {
        promise = prom
          .apply(null, args)
          .then((v) => {
            return v;
          })
          .finally(() => {
            promise = undefined;
          });
      }
      return promise;
    },
  };
};
