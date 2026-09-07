import { useCallback, useState } from "react";
import { postPredict, postDemoPredict } from "@/api/endpoints";
import { normalizeApiError, type ApiErrorShape } from "@/api/client";
import type {
  PassengerInput,
  PredictionResponse,
  NormalizedPrediction,
} from "@/types/prediction";

function normalizePrediction(raw: PredictionResponse): NormalizedPrediction {
  const prediction = raw.prediction;

  // Normalize prediction into a boolean
  let survived: boolean;

  if (typeof raw.survived === "boolean") {
    survived = raw.survived;
  } else if (typeof prediction === "number") {
    survived = prediction === 1;
  } else if (typeof prediction === "boolean") {
    survived = prediction;
  } else {
    const value = String(prediction).trim().toLowerCase();

    survived = [
      "1",
      "true",
      "yes",
      "survived",
      "survive",
      "alive",
    ].includes(value);
  }

  // Normalize probability/confidence
  const probabilityRaw = raw.probability ?? raw.confidence ?? 0.5;

  const probability =
    probabilityRaw <= 1 ? probabilityRaw : probabilityRaw / 100;

  const confidenceRaw = raw.confidence ?? raw.probability ?? probability;

  const confidence =
    confidenceRaw <= 1 ? confidenceRaw : confidenceRaw / 100;

  return {
    survived,
    probability,
    confidence,
    model: raw.model ?? raw.model_version ?? "Champion Model",
    predictionId: raw.prediction_id ?? crypto.randomUUID(),
    latencyMs: raw.latency_ms ?? 0,
    timestamp: raw.timestamp ?? new Date().toISOString(),
  };
}

export function usePrediction() {
  const [result, setResult] = useState<NormalizedPrediction | null>(null);
  const [error, setError] = useState<ApiErrorShape | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const predict = useCallback(
    async (payload: PassengerInput, useDemo: boolean) => {
      setIsSubmitting(true);
      setError(null);

      const startedAt = performance.now();

      try {
        const raw = useDemo
          ? await postDemoPredict(payload)
          : await postPredict(payload);

       

        const normalized = normalizePrediction(raw);

        if (!normalized.latencyMs) {
          normalized.latencyMs = Math.round(
            performance.now() - startedAt
          );
        }

        setResult(normalized);

        return normalized;
      } catch (err) {
        const normalizedError = normalizeApiError(err);
        setError(normalizedError);
        throw normalizedError;
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    predict,
    result,
    error,
    isSubmitting,
    reset,
  };
}