import { MutableRefObject, useEffect } from "react";

/**
 * hook to focus ref
 *
 * passing a different ref shifts focus
 */
export default function useFocus<T extends HTMLElement>(
  ref: MutableRefObject<T | null>
): void {
  useEffect(() => {
    ref?.current?.focus();
  }, [ref]);
}
