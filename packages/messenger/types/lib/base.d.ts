export class BaseDistributedEventBus {
    send(name: any, msg: any): Promise<void>;
    listen(name: any, fn: any): Promise<void>;
}
