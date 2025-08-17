export function createPool<T extends PoolPromise>(prom: T, { id }: PoolOptions): {
    /**
     * @param {Parameters<T>} args
     * @returns {ReturnType<T>}
     */
    get(...args: Parameters<T>): ReturnType<T>;
};
export type PoolOptions = {
    /**
     * unique identifier
     */
    id: string;
    timeout?: number;
};
export type PoolPromise = (...args: any[]) => Promise<any>;
export type Pool<T extends PoolPromise> = {
    get: (...args: Parameters<T>) => ReturnType<T>;
};
export type PoolCreator<T extends PoolPromise> = (prom: PoolPromise, opts: PoolOptions) => Pool<T>;
