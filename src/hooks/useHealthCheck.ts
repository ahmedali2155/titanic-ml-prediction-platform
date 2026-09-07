import { getHealthCheck } from "@/api/endpoints";
import { usePolledResource } from "./usePolledResource";
import type { ConnectionState } from "@/types/metrics";

const HEALTH_POLL_INTERVAL_MS = 30_000;

export function useHealthCheck() {
  const { data, error, isLoading, refetch } = usePolledResource(getHealthCheck, {
    intervalMs: HEALTH_POLL_INTERVAL_MS,
  });

  const status: ConnectionState = isLoading ? "checking" : error ? "offline" : "online";

  return { health: data, status, error, isLoading, refetch };
}
