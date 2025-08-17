import { z } from "./zod.js";

/**
 * @typedef {'get'|'post'|'put'|'delete'|'patch'} Methods
 */

/**
 * @template TInput, TOutput
 * @typedef {object} BaseOptions
 * @property {string} path
 * @property {Methods} [method='GET']
 * @property {z.Schema<TInput>|z.ZodEffects<z.Schema<TInput>>} input
 * @property {z.Schema<TOutput>} output
 */

/**
 * @template TInput, TOutput
 * @param {BaseOptions<TInput, TOutput>} options
 * @returns {BaseOptions<TInput, TOutput>}
 */
export const createRoute = ({
  path,
  method = "get",
  input = z.any(),
  output,
}) => ({
  path,
  method,
  input,
  output,
});

/**
 * @template TInput, TOutput
 * @param {BaseOptions<TInput, TOutput>} route
 * @returns {(req: import('express').Request) => TInput}
 */
const getInputGetter = (route) => {
  switch (route.method) {
    case "get":
      return (req) => route.input.parse(req.query);
    default:
      return (req) => {
        return route.input.parse(req.body);
      };
  }
};

/**
 * @template TInput, TOutput
 * @param {object} options
 * @param {BaseOptions<TInput, TOutput>} options.route
 * @param {(input: TInput) => Promise<TOutput>} options.resolver
 * @param {import('@opentelemetry/api').Tracer} options.tracer
 * @returns {import('express').Handler}
 */
export const createHTTPResolver = ({ route, resolver, tracer }) => {
  return async (req, res) => {
    const inputGetter = getInputGetter(route);
    // await tracer.startActiveSpan(
    //   `${route.method} ${route.path}`,
    //   async (span) => {
    //     span.setAttribute('http.method', route.method);
    //     span.setAttribute('http.route', route.path);

    try {
      const output = await resolver(inputGetter(req));
      res.json(route.output.parse(output));
    } catch (e) {
      if (e?.name === "ZodError") {
        // span.setAttribute('error.type', 'ZodError');
        // span.setAttribute('http.status_code', 400);
        return res.status(400).json({ errors: e.issues });
      }
      // span.setAttribute('error.type', e.name);
      // span.setAttribute('http.status_code', 500);
      console.error(e);
      res.status(500).json({ message: "server error" });
    } finally {
      // span.end();
    }
    // }
    // );
  };
};

/**
 * @template TInput, TOutput
 * @param {BaseOptions<TInput, TOutput>} route
 * @return {string}
 */
export const getRouteKey = (route) => {
  return `${route.method}::${route.path}`;
};
