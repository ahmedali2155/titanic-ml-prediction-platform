import { useCallback, useEffect, useRef, useState } from "react";
import { normalizeApiError, type ApiErrorShape } from "@/api/client";

interface UsePolledResourceOptions {
  intervalMs?: number;
  enabled?: boolean;
}

interface UsePolledResourceResult<T> {
  data: T | null;
  error: ApiErrorShape | null;
  isLoading: boolean;
  isRefreshing: boolean;
  refetch: () => Promise<void>;
}

/**
 * Fetches a resource once on mount and then re-polls it on an interval.
 * Distinguishes the initial load (isLoading) from background refreshes (isRefreshing)
 * so the UI can show skeletons only on first load.
 */
export function usePolledResource<T>(
  fetcher: () => Promise<T>,
  { intervalMs, enabled = true }: UsePolledResourceOptions = {}
): UsePolledResourceResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiErrorShape | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const hasLoadedOnce = useRef(false);

  const load = useCallback(async () => {
    if (!enabled) return;
    if (hasLoadedOnce.current) setIsRefreshing(true);
    try {
      const result = await fetcher();
      setData(result);
      setError(null);
    } catch (err) {
      setError(normalizeApiError(err));
    } finally {
      hasLoadedOnce.current = true;
      setIsLoading(false);
      setIsRefreshing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  useEffect(() => {
    load();
    if (!intervalMs || !enabled) return;
    const id = window.setInterval(load, intervalMs);
    return () => window.clearInterval(id);
  }, [load, intervalMs, enabled]);

  return { data, error, isLoading, isRefreshing, refetch: load };
}
