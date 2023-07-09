import { renderHook } from "@testing-library/react";

import useRipple from "./use-ripple";

describe("useRipple", () => {
  it('should render with "null"', () => {
    renderHook(() => useRipple(null));
  });

  it('should render with "button"', () => {
    const button = document.createElement("button");
    const ref = { current: button };

    button.addEventListener = jest.fn();
    button.removeEventListener = jest.fn();

    const { unmount } = renderHook(() => useRipple(ref.current));

    expect(button.addEventListener).toHaveBeenCalled();

    unmount();

    expect(button.removeEventListener).toHaveBeenCalled();
  });
});
