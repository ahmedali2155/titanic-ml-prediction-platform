import { getMetrics, getDriftMetrics, getABMetrics } from "@/api/endpoints";
import { usePolledResource } from "./usePolledResource";

const REFRESH_INTERVAL_MS = 15_000;

export function useMetrics() {
  return usePolledResource(getMetrics, { intervalMs: REFRESH_INTERVAL_MS });
}

export function useDriftMetrics() {
  return usePolledResource(getDriftMetrics, { intervalMs: REFRESH_INTERVAL_MS });
}

export function useABMetrics() {
  return usePolledResource(getABMetrics, { intervalMs: REFRESH_INTERVAL_MS });
}
