export function createMemoryStore<T>(): {
    on: <U extends "set" | "delete">(eventName: U, fn: (data: (Extract<{
        eventName: "set";
        data: {
            key: string;
            value: {};
        };
    }, {
        eventName: U;
    }> | Extract<{
        eventName: "delete";
        data: {
            key: string;
            value?: undefined;
        };
    }, {
        eventName: U;
    }>)["data"]) => void) => () => void;
    /**
     * @param {string} key
     * @returns {Promise<import("./stores.js").WrappedValue<T>>}
     */
    get(key: string): Promise<import("./stores.js").WrappedValue<T>>;
    /**
     * @param {string} key
     * @param {import("./stores.js").WrappedValue<T>} value
     * @returns {Promise<void>}
     */
    set(key: string, value: import("./stores.js").WrappedValue<T>): Promise<void>;
    /**
     * @param {string} key
     * @returns {Promise<void>}
     */
    delete(key: string): Promise<void>;
    subscribe(key: any, cb: any): () => void;
};
