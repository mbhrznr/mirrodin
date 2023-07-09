import { useCallback, useEffect, useState } from "react";

/**
 * hook to determine if given media query is true or not
 */
export default function useMediaQuery(query: string): boolean {
  const [match, setMatch] = useState<boolean>(false);

  const update = useCallback((event: MediaQueryListEvent) => {
    if (event.matches) {
      setMatch(true);
    } else {
      setMatch(false);
    }
  }, []);

  useEffect(() => {
    const media = matchMedia(query);

    media.addEventListener("change", update);

    if (media.matches) {
      setMatch(true);
    }

    return () => media.removeEventListener("change", update);
  }, [query, update]);

  return match;
}
