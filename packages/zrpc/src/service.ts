import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import responseTime from 'response-time';
import compression from 'compression';
import winston from 'winston';
import expressWinston from 'express-winston';
import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { createHTTPResolver, getRouteKey, RouteOptions } from './router';
import { BaseDistributedEventBus } from '@6edesign/messenger';
import { OpenAPIObject } from 'openapi3-ts/oas30';
import http from 'http';

export interface Logger {
  log: (level: string, message: string) => void;
  info: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string | Error) => void;
  debug: (message: string) => void;
}

export interface ZRPCServiceOptions {
  port?: number;
  name: string;
  useCors?: boolean;
  useCompression?: boolean;
  logger?: Logger;
  eventBus?: BaseDistributedEventBus;
}

export class ZRPCService {
  public readonly app: Express;
  public readonly name: string;
  private readonly port: number;
  private readonly logger: Logger;
  private routes: RouteOptions<any, any>[] = [];
  private resolverMap: Record<string, { route: RouteOptions<any, any>; resolver: (input: any) => Promise<any> }> = {};
  private server?: http.Server;

  constructor(options: ZRPCServiceOptions) {
    this.name = options.name;
    this.port = options.port ?? 80;
    this.logger = options.logger ?? console;
    this.app = express();

    if (options.eventBus) {
      options.eventBus.listen(`${this.name}ServiceQueue`, this.handleMessage.bind(this));
    }

    if (options.useCors !== false) {
      this.app.use(cors());
    }
    if (options.useCompression !== false) {
      this.app.use(compression());
    }

    this.app.use(bodyParser.json());
    this.app.use(responseTime());

    this.app.use(expressWinston.logger({
      transports: [new winston.transports.Console()],
      format: winston.format.combine(winston.format.colorize(), winston.format.json()),
      meta: true,
      msg: 'HTTP {{req.method}} {{req.url}}',
      expressFormat: true,
      colorize: false,
    }));
  }

  public addRoute<TInput, TOutput>(
    route: RouteOptions<TInput, TOutput>,
    resolver: (input: TInput) => Promise<TOutput>
  ) {
    this.routes.push(route);
    this.resolverMap[getRouteKey(route)] = { route, resolver };

    const httpMethod = route.method ?? 'get';
    this.app[httpMethod](route.path, createHTTPResolver({ route, resolver }));
  }

  private async handleMessage({ key = '', input }: { key?: string; input?: unknown } = {}) {
    if (!key || !input) throw new Error('Invalid message format: key and input are required.');

    const { route, resolver } = this.resolverMap[key] ?? {};
    if (!resolver) {
      this.logger.error(`No resolver found for message key: ${key}`);
      throw new Error('NoResolver');
    }

    try {
      const parsedInput = route.input?.parse(input);
      await resolver(parsedInput);
    } catch (error) {
      this.logger.error(error as Error);
      throw error;
    }
  }

  public start(): Promise<void> {
    const openApiDoc = this.generateOpenAPI();
    this.app.get('/openapi.json', (req, res) => res.json(openApiDoc));
    this.app.get(['/health', '/readiness'], (req, res) => res.json({ status: 'OK' }));

    this.app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      this.logger.error(err.stack ?? err.message);
      res.status(500).send('Something broke!');
    });

    return new Promise((resolve) => {
      this.server = this.app.listen(this.port, () => {
        this.logger.info(`${this.name} service started on port ${this.port}`);
        resolve();
      });
    });
  }

  public stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.server) {
        this.server.close((err) => {
          if (err) {
            this.logger.error(`Error stopping service: ${err.message}`);
            return reject(err);
          }
          this.logger.info(`${this.name} service stopped.`);
          resolve();
        });
      } else {
        resolve(); // No server to stop
      }
    });
  }

  public generateOpenAPI(): OpenAPIObject {
    const registry = new OpenAPIRegistry();

    this.routes.forEach((route) => {
      registry.registerPath({
        method: route.method ?? 'get',
        path: route.path,
        ...route.openapi, // Spread the openapi property here
        request: {
          ...(route.method === 'get' && { query: route.input as any }),
          ...(route.method !== 'get' && {
            body: {
              description: '',
              content: { 'application/json': { schema: route.input as any } },
            },
          }),
        },
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: route.output as any,
              },
            },
          },
        },
      });
    });

    const generator = new OpenApiGeneratorV3(registry.definitions);
    return generator.generateDocument({
      info: { title: `${this.name} API Spec`, version: '1.0' },
      servers: [{ url: `/` }],
      openapi: '3.0.0',
    });
  }
}