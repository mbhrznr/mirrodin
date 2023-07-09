import { renderHook } from "@testing-library/react";

import useClipboard from "./use-clipboard";

describe("useClipboard", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });
  });

  it("should render", () => {
    renderHook(() => useClipboard());
  });

  it("should copy text", () => {
    const text = "copied text";
    const { result } = renderHook(() => useClipboard());

    result.current.copy(text);

    expect(result.current.copy).toBeTruthy();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text);
  });
});
