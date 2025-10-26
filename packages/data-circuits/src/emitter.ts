
export type EventDefinition = {
  eventName: string;
  data?: any;
};

export const createEmitter = <T extends ReadonlyArray<EventDefinition>>(
  _events?: T
) => {
  const subscribers: { [key: string]: ((data: any) => void)[] } = {};

  return {
    on<TEventName extends T[number]['eventName']>(
      eventName: TEventName,
      fn: (
        data: Extract<T[number], { eventName: TEventName }>['data']
      ) => void
    ): () => void {
      if (!subscribers[eventName]) {
        subscribers[eventName] = [];
      }
      subscribers[eventName].push(fn);
      return () => {
        subscribers[eventName] = subscribers[eventName].filter((s) => s !== fn);
      };
    },

    emit<TEventName extends T[number]['eventName']>(
      eventName: TEventName,
      data: Extract<T[number], { eventName: TEventName }>['data']
    ) {
      if (!subscribers[eventName]) {
        return;
      }
      subscribers[eventName].forEach((sub) => sub(data));
    },
  };
};
