export type Sex = "male" | "female";
export type EmbarkPort = "C" | "Q" | "S";

export interface PassengerInput {
  pclass: number;
  sex: Sex;
  age: number;
  sibsp: number;
  parch: number;
  fare: number;
  embarked: EmbarkPort;
}

export interface PredictionResponse {
  prediction: 0 | 1 | string;
  survived?: boolean;
  confidence?: number;
  probability?: number;
  model?: string;
  model_version?: string;
  prediction_id?: string;
  latency_ms?: number;
  timestamp?: string;
  [key: string]: unknown;
}

export interface NormalizedPrediction {
  survived: boolean;

  // NEW
  probability: number;

  confidence: number;

  model: string;

  predictionId: string;

  latencyMs: number;

  timestamp: string;
}