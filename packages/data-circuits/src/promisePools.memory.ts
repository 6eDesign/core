
export type PoolPromise = (...args: any[]) => Promise<any>;

export interface PoolOptions {
  id: string;
  timeout?: number;
}

export interface Pool<T extends PoolPromise> {
  get(...args: Parameters<T>): ReturnType<T>;
}

export type PoolCreator<T extends PoolPromise> = (
  prom: T,
  opts: PoolOptions
) => Pool<T>;

export const createPool = <T extends PoolPromise>(
  prom: T,
  _opts: PoolOptions
): Pool<T> => {
  let promise: ReturnType<T> | undefined = undefined;

  return {
    get(...args: Parameters<T>): ReturnType<T> {
      if (!promise) {
        promise = prom(...args)
          .then((v) => v)
          .finally(() => {
            promise = undefined;
          }) as ReturnType<T>;
      }
      return promise;
    },
  };
};
