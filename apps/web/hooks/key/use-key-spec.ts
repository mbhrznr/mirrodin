import { fireEvent } from "@testing-library/dom";
import { renderHook } from "@testing-library/react";
import useKey from "./use-key";

const fn = jest.fn();

describe("useKey", () => {
  it("should not invoke fn when pressing wrong key", () => {
    renderHook(() => useKey("a", fn));
    fireEvent.keyUp(document, { key: "b", code: 98, charCode: 98 });

    expect(fn).not.toHaveBeenCalled();
  });

  it("should invoke fn when the passed key is pressed", () => {
    renderHook(() => useKey("a", fn));
    fireEvent.keyUp(document, { key: "a", code: 97, charCode: 97 });

    expect(fn).toHaveBeenCalled();
  });
});
