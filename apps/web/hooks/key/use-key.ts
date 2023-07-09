import { useEffect } from "react";

/**
 * hook to register global key events
 */
export default function useKey(
  key: KeyboardEvent["key"],
  fn: (event: KeyboardEvent) => void
): void {
  useEffect(() => {
    function press(event: KeyboardEvent) {
      if (event.key === key) {
        fn(event);
      }
    }

    document.addEventListener("keyup", press);

    return () => document.removeEventListener("keyup", press);
  }, [fn, key]);
}
