/**
 * @typedef {object} Logger
 * @property {function} log
 * @property {function} info
 * @property {function} warn
 * @property {function} error
 * @property {function} debug
 */
/**
 * @typedef {object} MicroServiceOptions
 * @property {number} [options.port=80]
 * @property {string} options.name
 * @property {boolean} [options.useCors=true]
 * @property {boolean} [options.useCompression=true]
 * @property {Logger} [options.logger=console]
 * @property {import('@6edesign/messenger').BaseDistributedEventBus} [options.eventBus]
 */
export class MicroService {
    /**
     * Creates an instance of MicroService.
     * @param {MicroServiceOptions} options
     * @memberof MicroService
     */
    constructor({ port, name, useCors, useCompression, logger, eventBus }: MicroServiceOptions);
    port: number;
    name: string;
    app: any;
    routes: any[];
    resolverMap: {};
    logger: Logger;
    /**
     * @template TInput, TOutput
     * @param {import('./router').BaseOptions<TInput, TOutput>} route
     * @param {(input: TInput) => Promise<TOutput>} resolver
     * @memberof MicroService
     */
    addRoute<TInput, TOutput>(route: import("./router").BaseOptions<TInput, TOutput>, resolver: (input: TInput) => Promise<TOutput>): void;
    /**
     * @param {object} msg
     * @param {string} [msg.key]
     * @param {any} [msg.input]
     */
    handleMessage({ key, input }?: {
        key?: string;
        input?: any;
    }): Promise<void>;
    start(): Promise<any>;
    /**
     *
     * @returns {ReturnType<typeof OpenApiGeneratorV3.prototype.generateDocument>}
     */
    generateOpenAPI(): ReturnType<typeof OpenApiGeneratorV3.prototype.generateDocument>;
}
export type Logger = {
    log: Function;
    info: Function;
    warn: Function;
    error: Function;
    debug: Function;
};
export type MicroServiceOptions = {
    port?: number;
    name: string;
    useCors?: boolean;
    useCompression?: boolean;
    logger?: Logger;
    eventBus?: import("@6edesign/messenger").BaseDistributedEventBus;
};
import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
