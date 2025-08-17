export class MQTTEventBus extends BaseDistributedEventBus {
    /**
     * Creates an instance of RedisEventBus.
     *
     * @param {object} options
     * @param {string} options.mqttUrl
     * @memberof RedisEventBus
     */
    constructor(options: {
        mqttUrl: string;
    });
    connection: Promise<mqtt.MqttClient>;
    eventListeners: {};
    _init(): Promise<void>;
    _getConnection(): Promise<mqtt.MqttClient>;
}
import { BaseDistributedEventBus } from './base.js';
import mqtt from 'mqtt';
