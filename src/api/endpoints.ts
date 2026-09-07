import { apiClient } from "./client";

import type {
  HealthCheckResponse,
  MetricsResponse,
  DriftResponse,
  ABMetricsResponse,
} from "@/types/metrics";

import type {
  PassengerInput,
  PredictionResponse,
} from "@/types/prediction";

/**
 * Convert frontend camelCase fields
 * to the PascalCase format expected
 * by the FastAPI backend.
 */
function toApiPayload(payload: PassengerInput) {
  return {
    Pclass: payload.pclass,
    Sex: payload.sex,
    Age: payload.age,
    SibSp: payload.sibsp,
    Parch: payload.parch,
    Fare: payload.fare,
    Embarked: payload.embarked,
  };
}

/* -------------------------------------------------------------------------- */
/*                           PROMETHEUS PARSER                                */
/* -------------------------------------------------------------------------- */

function parsePrometheusMetrics(text: string): MetricsResponse {
  const getMetricValue = (metricName: string): number | undefined => {
    const regex = new RegExp(
      `^${metricName}(?:\\{[^}]*\\})?\\s+([-+]?\\d*\\.?\\d+(?:[eE][-+]?\\d+)?)$`,
      "m"
    );

    const match = text.match(regex);

    if (!match) {
      return undefined;
    }

    const value = Number(match[1]);

    return Number.isFinite(value) ? value : undefined;
  };

  const predictionCount = getMetricValue("model_predictions_total");

  const inferenceCount = getMetricValue(
    "model_inference_latency_seconds_count"
  );

  const inferenceSum = getMetricValue(
    "model_inference_latency_seconds_sum"
  );

  const memoryBytes = getMetricValue(
    "process_resident_memory_bytes"
  );

  /*
   * Prometheus stores these as cumulative values.
   * We can calculate the current average latency from count + sum.
   */
  const avgLatencyMs =
    inferenceCount !== undefined &&
    inferenceCount > 0 &&
    inferenceSum !== undefined
      ? (inferenceSum / inferenceCount) * 1000
      : undefined;

  /*
   * p95 and requests/minute cannot be reliably calculated
   * from a single Prometheus scrape without historical samples.
   */
  return {
    prediction_count: predictionCount,
    total_requests: predictionCount,
    avg_latency_ms:
      avgLatencyMs !== undefined
        ? Number(avgLatencyMs.toFixed(2))
        : undefined,
    p95_latency_ms: undefined,
    memory_usage_mb:
      memoryBytes !== undefined
        ? Number((memoryBytes / 1024 / 1024).toFixed(2))
        : undefined,
    cpu_usage_percent: undefined,
    requests_per_minute: undefined,
  };
}

/* -------------------------------------------------------------------------- */
/*                                   GET APIs                                 */
/* -------------------------------------------------------------------------- */

export async function getHealthCheck(): Promise<HealthCheckResponse> {
  const { data } = await apiClient.get("/health-check");
  return data;
}

export async function getMetrics(): Promise<MetricsResponse> {
  const response = await apiClient.get<string>("/metrics", {
    responseType: "text",
  });

  return parsePrometheusMetrics(response.data);
}

export async function getDriftMetrics(): Promise<DriftResponse> {
  const { data } = await apiClient.get("/metrics/drift");
  return data;
}

export async function getABMetrics(): Promise<ABMetricsResponse> {
  const { data } = await apiClient.get("/ab/metrics");
  return data;
}

/* -------------------------------------------------------------------------- */
/*                                Prediction APIs                             */
/* -------------------------------------------------------------------------- */

export async function postPredict(
  payload: PassengerInput
): Promise<PredictionResponse> {
  const apiPayload = toApiPayload(payload);

  const { data } = await apiClient.post(
    "/predict",
    apiPayload
  );

  return data;
}

export async function postDemoPredict(
  payload: PassengerInput
): Promise<PredictionResponse> {
  const apiPayload = toApiPayload(payload);

  const { data } = await apiClient.post(
    "/demo/predict",
    apiPayload
  );

  return data;
}