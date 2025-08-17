import { trace } from "@opentelemetry/api";

/**
 * Get tracer for manual instrumentation
 *
 * @param {string} serviceName 
 */
export const getTracer = (serviceName) => trace.getTracer(serviceName);
