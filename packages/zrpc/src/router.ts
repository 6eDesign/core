import { z } from './zod';
import type { Request, Response, NextFunction, Handler } from 'express';
import type { Tracer } from '@opentelemetry/api';
import { OperationObject } from 'openapi3-ts/oas30';

export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export interface RouteOptions<TInput, TOutput> {
	path: string;
	method?: HttpMethod;
	input: z.Schema<TInput> | z.ZodEffects<z.Schema<TInput>>;
	output: z.Schema<TOutput>;
	openapi?: OperationObject; // Add openapi property for route-level metadata
}

export const createRoute = <TInput, TOutput>({
	path,
	method = 'get',
	input,
	output,
	openapi // Destructure openapi property
}: RouteOptions<TInput, TOutput>) => ({
	path,
	method,
	input,
	output,
	openapi // Pass it through
});

const getInputGetter = <TInput, TOutput>(route: RouteOptions<TInput, TOutput>) => {
	switch (route.method) {
		case 'get':
			return (req: Request) => route.input?.parse(req.query) as TInput;
		default:
			return (req: Request) => route.input?.parse(req.body) as TInput;
	}
};

interface HttpResolverOptions<TInput, TOutput> {
	route: RouteOptions<TInput, TOutput>;
	resolver: (input: TInput) => Promise<TOutput>;
	tracer?: Tracer; // Making tracer optional for now
}

export const createHTTPResolver = <TInput, TOutput>({
	route,
	resolver
}: HttpResolverOptions<TInput, TOutput>): Handler => {
	return async (req: Request, res: Response) => {
		const inputGetter = getInputGetter(route);
		try {
			const output = await resolver(inputGetter(req));
			res.json(route.output?.parse(output));
		} catch (e: any) {
			if (e instanceof z.ZodError) {
				return res.status(400).json({ errors: e.issues });
			}
			console.error(e);
			res.status(500).json({ message: 'server error' });
		}
	};
};

export const getRouteKey = <TInput, TOutput>(route: RouteOptions<TInput, TOutput>): string => {
	return `${route.method}::${route.path}`;
};
