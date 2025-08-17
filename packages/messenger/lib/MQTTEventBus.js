import mqtt from 'mqtt';
import { BaseDistributedEventBus } from './base.js';

export class MQTTEventBus extends BaseDistributedEventBus {
  /**
   * Creates an instance of RedisEventBus.
   *
   * @param {object} options
   * @param {string} options.mqttUrl
   * @memberof RedisEventBus
   */
  constructor(options) {
    super();
    this.connection = mqtt.connectAsync(options.mqttUrl);
    this.eventListeners = {};
    this._init();
  }

  async _init() {
    const conn = await this._getConnection();
    conn.on('error', (err) => {
      this.emit('error', err);
    });
    conn.on('message', (topic, payload) => {
      if (!this.eventListeners[topic]) return;
      try {
        this.eventListeners[topic](JSON.parse(payload.toString()));
      } catch (e) {
        this.emit('error', e);
      }
    });
  }

  async _getConnection() {
    return await this.connection;
  }

  async send(name, msg) {
    const conn = await this._getConnection();
    await conn.publishAsync(name, JSON.stringify(msg));
  }

  async listen(name, fn) {
    if (this.eventListeners[name]) {
      this.eventListeners[name] = fn;
      return;
    }
    this.eventListeners[name] = fn;
    const conn = await this._getConnection();
    await conn.subscribe(name);
  }
}
