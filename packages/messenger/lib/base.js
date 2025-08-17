import EventEmitter from 'events';

export class BaseDistributedEventBus extends EventEmitter {
  constructor() {
    super();
  }
  async send(name, msg) {}
  async listen(name, fn) {}
}
