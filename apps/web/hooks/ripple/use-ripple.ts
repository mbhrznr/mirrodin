import { useEffect } from "react";

function ripple<T extends HTMLElement>(this: T, event: MouseEvent): void {
  if (this.contains(event.target as Node) && !event.defaultPrevented) {
    const diameter = Math.max(this.offsetWidth, this.offsetHeight);
    const radius = diameter / 2;

    this.style.setProperty("--ripple-diameter", `${diameter}px`);
    this.style.setProperty(
      "--ripple-offset-x",
      `${event.clientX - (this.offsetLeft + radius)}px`
    );
    this.style.setProperty(
      "--ripple-offset-y",
      `${event.clientY - (this.offsetTop + radius)}px`
    );

    this.animate(
      {
        transform: "scale(2.5)",
        opacity: "0",
      },
      {
        duration: 600,
        pseudoElement: "::after",
      } as KeyframeAnimationOptions
    );
  }
}

/**
 * hook to simulate the `material-ui` ripple effect
 */
export default function useRipple<T extends HTMLElement>(ref: T | null): void {
  useEffect(() => {
    ref?.addEventListener("click", ripple);

    return () => ref?.removeEventListener("click", ripple);
  }, [ref]);
}
