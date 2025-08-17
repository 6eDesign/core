export function createEmitter<T extends Event[]>(events: T): {
    /**
     * @template {(typeof events[number])["eventName"]} U
     * @param {U} eventName
     * @param {(data: Extract<(typeof events[number]), { eventName: U }>["data"]) => void} fn
     * @returns {() => void} unsubscribe
     */
    on<U extends (typeof events)[number]["eventName"]>(eventName: U, fn: (data: Extract<((typeof events)[number]), {
        eventName: U;
    }>["data"]) => void): () => void;
    /**
     * @template {(typeof events[number])["eventName"]} U
     * @param {U} eventName
     * @param {Extract<(typeof events[number]), { eventName: U }>["data"]} data
     */
    emit<U extends (typeof events)[number]["eventName"]>(eventName: U, data: Extract<((typeof events)[number]), {
        eventName: U;
    }>["data"]): void;
};
export type Event = {
    eventName: string;
    data?: any;
};
