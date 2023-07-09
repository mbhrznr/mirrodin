import { renderHook } from "@testing-library/react";
import useCustomEvent from "./use-custom-event";

const listener = jest.fn();
const event = new CustomEvent("foo", { detail: "custom event" });

describe("useCustomEvent", () => {
  it("should not trigger callback on other event", () => {
    renderHook(() => useCustomEvent("bar", listener));

    document.dispatchEvent(event);

    expect(listener).not.toHaveBeenCalled();
  });

  it("should remove the event listener on unmount", () => {
    const { unmount } = renderHook(() => useCustomEvent("foo", listener));

    unmount();

    document.dispatchEvent(event);

    expect(listener).not.toHaveBeenCalled();
  });

  it("should trigger callback on given event", () => {
    renderHook(() => useCustomEvent("foo", listener));

    document.dispatchEvent(event);

    expect(listener).toHaveBeenCalled();
  });
});
