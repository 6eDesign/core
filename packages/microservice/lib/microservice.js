import express from 'express';
import { createHTTPResolver, getRouteKey } from './router.js';
import cors from 'cors';
import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import bodyParser from 'body-parser';
import responseTime from 'response-time';
import compression from 'compression';
import winston from 'winston';
import expressWinston from 'express-winston';

// import { InfluxDB, Point } from '@influxdata/influxdb-client';
// import { getTracer } from '@6edesign/tracing';

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
	constructor({
		port = 80,
		name,
		useCors = true,
		useCompression = true,
		logger = console,
		eventBus
	}) {
		this.port = port;
		this.name = name;
		this.app = express();
		this.routes = [];
		this.resolverMap = {};
		this.logger = logger;
		// this.tracer = getTracer(this.name);

		if (eventBus) eventBus.listen(`${this.name}ServiceQueue`, this.handleMessage.bind(this));

		if (useCors) this.app.use(cors());
		if (useCompression) this.app.use(compression({}));

		// this.influx = new InfluxDB({
		//   url: process.env.INFLUX_URL,
		//   token: process.env.INFLUX_TOKEN,
		// }).getWriteApi(process.env.INFLUX_ORG, process.env.INFLUX_BUCKET, 'ns', {
		//   flushInterval: 5000,
		// });

		this.app.use(bodyParser.json());

		this.app.use(
			responseTime((req, res, time) => {
				// const pt = new Point('microservice:request')
				//   .tag('method', req.method)
				//   .tag('path', req.baseUrl + req.path)
				//   .tag('service', this.name)
				//   .floatField('responseTime', time);
				// this.influx.writePoint(pt);
			})
		);

		this.app.use(
			expressWinston.logger({
				transports: [new winston.transports.Console()],
				format: winston.format.combine(winston.format.colorize(), winston.format.json()),
				meta: true, // optional: control whether you want to log the meta data about the request (default to true)
				msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
				expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
				colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
				ignoreRoute: function (req, res) {
					return false;
				} // optional: allows to skip some log messages based on request and/or response
			})
		);
	}

	/**
	 * @template TInput, TOutput
	 * @param {import('./router').BaseOptions<TInput, TOutput>} route
	 * @param {(input: TInput) => Promise<TOutput>} resolver
	 * @memberof MicroService
	 */
	addRoute(route, resolver) {
		this.routes.push(route);
		this.resolverMap[getRouteKey(route)] = { route, resolver };
		this.app[route.method ?? 'get'](
			route.path,
			createHTTPResolver({ route, resolver, tracer: this.tracer })
		);
	}

	/**
	 * @param {object} msg
	 * @param {string} [msg.key]
	 * @param {any} [msg.input]
	 */
	async handleMessage({ key = '', input } = {}) {
		if (!key || !input) throw new Error('InvalidMsgFormat');

		const { route, resolver } = this.resolverMap[key] ?? {};
		if (!resolver) throw new Error('NoResolver');

		const start = performance.now();
		route.input.parse(input);

		await resolver(input);
		// await this.tracer.startActiveSpan(
		//   `handleMessage - ${key}`,
		//   async (span) => {
		//     span.setAttribute('message.key', key);

		//     try {
		//       await resolver(input);
		//     } catch (e) {
		//       span.setAttribute('error.type', e.name);
		//       throw e;
		//     } finally {
		//       span.end();
		//     }
		//   }
		// );

		// const pt = new Point('microservice:message')
		//   .tag('key', key)
		//   .tag('service', this.name)
		//   .floatField('responseTime', performance.now() - start);
		// this.influx.writePoint(pt);
	}

	async start() {
		const oas = this.generateOpenAPI();

		this.app.use('/openapi.json', (req, res, next) => res.json(oas));
		this.app.get(['/health', '/readiness'], (req, res, next) => res.json({ status: 'OK' }));
		this.app.use((err, req, res, next) => {
			console.error(err.stack);
			res.status(500).send('Something broke!');
		});

		return new Promise((res) => this.app.listen(this.port, () => res()));
	}

	/**
	 *
	 * @returns {ReturnType<typeof OpenApiGeneratorV3.prototype.generateDocument>}
	 */
	generateOpenAPI() {
		const registry = new OpenAPIRegistry();

		this.routes.forEach(
			/**
			 * @template TInput, TOutput
			 * @param {import('./router').BaseOptions<TInput, TOutput>} route
			 */
			(route) => {
				registry.registerPath({
					method: route.method,
					path: route.path,
					request: {
						...(route.method === 'get' && { query: route.input }),
						...(route.method !== 'get' && {
							body: {
								description: '',
								content: { 'application/json': { schema: route.input } }
							}
						})
					},
					responses: {
						200: {
							description: 'Success',
							content: {
								'application/json': {
									schema: route.output
								}
							}
						}
					}
				});
			}
		);
		// console.log(JSON.stringify(registry.definitions, null, 2));
		const generator = new OpenApiGeneratorV3(registry.definitions);
		const doc = generator.generateDocument({
			info: { title: `${this.name} API Spec`, version: '1.0' },
			servers: [{ url: `http://localhost/` }],
			openapi: '3.0.0'
		});
		return doc;
	}
}
