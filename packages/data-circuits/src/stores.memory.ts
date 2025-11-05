
import { createEmitter } from './emitter';
import { PersistenceLayer, WrappedValue } from './stores';

const events = [
  {
    eventName: 'set' as const,
    data: { key: 'string', value: {} as WrappedValue<any> },
  },
  {
    eventName: 'delete' as const,
    data: { key: 'string' },
  },
];

export const createMemoryStore = <T>(): PersistenceLayer<T> => {
  const db: { [key: string]: WrappedValue<T> } = {};
  const { emit, on } = createEmitter(events);

  return {
    on,

    async get(key: string): Promise<WrappedValue<T> | undefined> {
      return db[key];
    },

    async set(key: string, value: WrappedValue<T>): Promise<void> {
      db[key] = value;
      emit('set', { key, value });
    },

    async delete(key: string): Promise<void> {
      delete db[key];
      emit('delete', { key });
    },

    subscribe(key: string, cb: (val: WrappedValue<T>) => void): () => void {
      return on('set', (data) => {
        if (data.key !== key) return;
        cb(data.value as WrappedValue<T>);
      });
    },
  };
};
