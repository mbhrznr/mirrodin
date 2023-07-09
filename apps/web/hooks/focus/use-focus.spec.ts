import { renderHook } from "@testing-library/react";

import useFocus from "./use-focus";

function create<K extends keyof HTMLElementTagNameMap>(
  tag: K
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  document.body.append(element);

  return element;
}

describe("useFocus", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should render", () => {
    renderHook(() => useFocus({ current: null }));
  });

  it("should focus input on mount", () => {
    const input = create("input");
    renderHook(() => useFocus({ current: input }));
    expect(input).toHaveFocus();
  });

  it("should focus select on mount", () => {
    const select = create("select");
    renderHook(() => useFocus({ current: select }));
    expect(select).toHaveFocus();
  });

  it("should not focus div on mount", () => {
    const div = create("div");
    expect(div).not.toHaveFocus();
  });
});
