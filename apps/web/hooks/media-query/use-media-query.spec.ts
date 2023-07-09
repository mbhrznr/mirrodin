import { renderHook } from "@testing-library/react";

import mockMatchMedia from "../../test/match-media";
import useMediaQuery from "./use-media-query";

const addEventListener = jest.fn();
const removeEventListener = jest.fn();

describe("useMediaQuery", () => {
  it("should add and remove event listener", () => {
    mockMatchMedia(false, { addEventListener, removeEventListener });
    const query = "(max-width: 1024px)";
    const { unmount } = renderHook(() => useMediaQuery(query));

    expect(addEventListener).toHaveBeenCalled();
    unmount();
    expect(removeEventListener).toHaveBeenCalled();
  });

  it("should return false if query does not match", () => {
    mockMatchMedia(false);
    const query = "(max-width: 768px)";
    const { result } = renderHook(() => useMediaQuery(query));

    expect(result.current).toBe(false);
    expect(matchMedia).toHaveBeenCalledWith(query);
    expect(result.current).toBe(false);
  });

  it("should return true if query does match", () => {
    mockMatchMedia(true);
    const { result } = renderHook(() =>
      useMediaQuery("(prefers-color-scheme: dark)")
    );

    expect(matchMedia).toHaveBeenCalled();
    expect(result.current).toBe(true);
  });
});
