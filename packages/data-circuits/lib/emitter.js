/**
 * @typedef {object} Event
 * @property {string} eventName
 * @property {any} [data]
 */

/**
 * @template {Event[]} T
 * @param {T} events
 */
export const createEmitter = (events) => {
  /** @type {Record<string, ((data: any) => () => void)[]>} */
  const subscribers = {};
  return {
    /**
     * @template {(typeof events[number])["eventName"]} U
     * @param {U} eventName
     * @param {(data: Extract<(typeof events[number]), { eventName: U }>["data"]) => void} fn
     * @returns {() => void} unsubscribe
     */
    on(eventName, fn) {
      if (!subscribers[eventName]) subscribers[eventName] = [];
      subscribers[eventName].push(fn);
      return () => {
        subscribers[eventName] = subscribers[eventName].filter((a) => a !== fn);
      };
    },
    /**
     * @template {(typeof events[number])["eventName"]} U
     * @param {U} eventName
     * @param {Extract<(typeof events[number]), { eventName: U }>["data"]} data
     */
    emit(eventName, data) {
      if (!subscribers[eventName]) return;
      subscribers[eventName].forEach((sub) => sub(data));
    },
  };
};

// const events = [
//   { eventName: /** @type {const} **/ ('foosy'), data: { foo: 'bar' } },
//   { eventName: /** @type {const} **/ ('blue'), data: { one: 1, two: 2 } },
// ];
// const emitter = createEmitter(events);
// emitter.on('foosy', (d) => d.foo.toUpperCase());
// emitter.on('blue', (d) => {});
