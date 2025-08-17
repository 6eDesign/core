import opentelemetry from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";
import { PrometheusExporter } from "@opentelemetry/exporter-prometheus";

if (process.env.NODE_ENV !== "production") {
  diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);
}

const sdk = new opentelemetry.NodeSDK({
  serviceName: process.env.OTEL_SERVICE_NAME,
  traceExporter: new OTLPTraceExporter({
    url: `${process.env.OTEL_ENDPOINT || "http://localhost:4318"}/v1/traces`,
  }),
  metricReader: new PrometheusExporter({ port: 9464 }),
  instrumentations: [
    getNodeAutoInstrumentations({
      "@opentelemetry/instrumentation-fs": {
        enabled: false,
      },
    }),
  ],
  autoDetectResources: true,
});

sdk.start();
