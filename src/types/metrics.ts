export interface HealthCheckResponse {
  status: string;
  uptime_seconds?: number;
  version?: string;
  [key: string]: unknown;
}

export interface MetricsResponse {
  prediction_count?: number;
  total_requests?: number;
  avg_latency_ms?: number;
  p95_latency_ms?: number;
  memory_usage_mb?: number;
  cpu_usage_percent?: number;
  requests_per_minute?: number;
  error_rate?: number;
  uptime_seconds?: number;
  [key: string]: unknown;
}

export interface DriftStatistic {
  ks_statistic: number;
  p_value: number;
}

export interface DriftPoint {
  feature: string;
  drift_score: number;
  threshold?: number;
  is_drifted?: boolean;
  timestamp?: string;
}

export interface DriftResponse {
  // Current backend
  drift_detected?: boolean;
  drifted_features?: string[];
  statistics?: Record<string, DriftStatistic>;
  production_samples?: number;

  // Future support
  overall_drift_score?: number;
  features?: DriftPoint[];
  history?: {
    timestamp: string;
    drift_score: number;
  }[];

  [key: string]: unknown;
}

export interface ABMetricsResponse {
  champion_requests?: number;
  challenger_requests?: number;
  traffic_split?: {
    champion: number;
    challenger: number;
  };
  champion_accuracy?: number;
  challenger_accuracy?: number;
  champion_latency_ms?: number;
  challenger_latency_ms?: number;
  [key: string]: unknown;
}

export type ConnectionState = "online" | "offline" | "checking";