import { useCallback, useEffect, useMemo, useState } from "react";

type UseFetchResult<D, E> = {
  data: D | undefined;
  error: E | undefined;
  loading: boolean;
  signal: AbortController["signal"];
  request: () => Promise<void>;
};

/**
 * hook for native `fetch`
 *
 * takes url, options and defer as arguments
 *
 * gets invoked on every render cycle, unless `defer` is true
 * gets aborted once unmounted
 */
export default function useFetch<D, E = Error>(
  path: string,
  options: RequestInit = {},
  defer = false
): UseFetchResult<D, E> {
  const [data, setData] = useState<D>();
  const [error, setError] = useState<E>();
  const [loading, setLoading] = useState(!defer);
  // convert options to string to use it as deps
  const optionsString = JSON.stringify(options);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const controller = useMemo(
    () => new AbortController(),
    [defer, optionsString, path]
  );

  const request = useCallback(async () => {
    setLoading(true);

    try {
      const res = await fetch(path, { ...options, signal: controller.signal });
      const data = await res.json();

      if (res.status >= 400) {
        setData(undefined);
        setError(data);
      } else {
        setData(data as D);
        setError(undefined);
      }
    } catch (error) {
      setData(undefined);
      setError(error as E);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controller, optionsString, path]);

  useEffect(() => {
    if (!defer) {
      request();
    }

    return () => {
      controller.abort();
    };
  }, [controller, defer, request]);

  return {
    data,
    error,
    loading,
    request,
    signal: controller.signal,
  };
}
