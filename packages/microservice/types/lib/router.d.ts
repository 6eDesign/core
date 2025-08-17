export function createRoute<TInput, TOutput>({ path, method, input, output, }: BaseOptions<TInput, TOutput>): BaseOptions<TInput, TOutput>;
export function createHTTPResolver<TInput, TOutput>({ route, resolver, tracer }: {
    route: BaseOptions<TInput, TOutput>;
    resolver: (input: TInput) => Promise<TOutput>;
    tracer: import("@opentelemetry/api").Tracer;
}): any;
export function getRouteKey<TInput, TOutput>(route: BaseOptions<TInput, TOutput>): string;
export type Methods = "get" | "post" | "put" | "delete" | "patch";
export type BaseOptions<TInput, TOutput> = {
    path: string;
    method?: Methods;
    input: z.Schema<TInput> | z.ZodEffects<z.Schema<TInput>>;
    output: z.Schema<TOutput>;
};
import { z } from "./zod.js";
