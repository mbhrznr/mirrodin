import { useEffect } from "react";

/**
 * hook to register global custom events
 */
export default function useCustomEvent<T>(
  key: string,
  fn: (event: CustomEvent<T>) => void
): void {
  useEffect(() => {
    document.addEventListener(
      key as keyof DocumentEventMap,
      fn as EventListener
    );

    return () =>
      document.removeEventListener(
        key as keyof DocumentEventMap,
        fn as EventListener
      );
  }, [fn, key]);
}
