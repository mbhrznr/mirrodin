import { fireEvent, render } from "@testing-library/react";

import mockMatchMedia from "~/test/match-media";
import Search from "./search";
import type { SearchError, SearchResult } from "~/types/types";

const data = {
  docs: [
    { meta: {}, slug: "angular" },
    { meta: {}, slug: "deno" },
    { meta: {}, slug: "next" },
    { meta: {}, slug: "react" },
  ],
  total: 0,
} satisfies SearchResult;
const error = {
  name: "replyerror",
  message: "syntax error at offset 0 near p",
} satisfies SearchError;
const push = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push,
    };
  },
}));

describe("search", () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  it("should render", () => {
    const { container } = render(<Search />);

    expect(container).toBeTruthy();
  });

  it('should work "uncontrolled"', () => {
    const value = "value";
    const result = "result";
    const { container } = render(<Search input={{ defaultValue: value }} />);
    const input = container.querySelector("input");

    expect(input).toBeTruthy();
    expect((input as HTMLInputElement).value).toBe(value);

    fireEvent.change(input as HTMLInputElement, {
      target: { value: result },
    });

    expect((input as HTMLInputElement).value).toBe(result);
  });

  it("should work with input props", () => {
    const value = "value";
    const result = "result";
    const onChange = jest.fn();
    const { container } = render(<Search input={{ value, onChange }} />);
    const input = container.querySelector("input");

    fireEvent.change(input as HTMLInputElement, { target: { value: result } });

    expect(onChange).toHaveBeenCalled();
  });

  it("should work with form props", () => {
    const onSubmit = jest.fn();
    const { container } = render(<Search form={{ onSubmit }} />);
    const form = container.querySelector("form");

    fireEvent.submit(form as HTMLFormElement);

    expect(onSubmit).toHaveBeenCalled();
  });

  it("should work with error props", () => {
    const { getByText } = render(<Search error={error} />);

    expect(getByText(error.name, { exact: false })).toBeInTheDocument();
    expect(getByText(error.message)).toBeInTheDocument();
  });

  it("should work with data props", () => {
    const { getByText } = render(<Search data={data} />);

    for (const doc of data.docs) {
      expect(getByText(doc.slug)).toBeInTheDocument();
    }
  });

  it("should have focus on mount", () => {
    const { container } = render(<Search />);
    const input = container.querySelector("input");

    expect(input).toHaveFocus();
  });

  it('should get focus when entering "/"', () => {
    const { container } = render(<Search />);
    const input = container.querySelector("input");

    /** lose focus on purpose */
    (document.activeElement as HTMLElement)?.blur?.();

    expect(input).not.toHaveFocus();

    fireEvent.keyUp(document, { key: "/" });

    expect(input).toHaveFocus();
  });

  it("should focus docs and input when using arrow keys", () => {
    const { container, getByText } = render(<Search data={data} />);
    const input = container.querySelector("input");

    expect(input).toHaveFocus();

    fireEvent.keyUp(document, { key: "ArrowDown" });
    fireEvent.keyUp(document, { key: "ArrowDown" });

    expect(getByText(data.docs[1].slug)).toHaveFocus();

    fireEvent.keyUp(document, { key: "ArrowUp" });

    expect(getByText(data.docs[0].slug)).toHaveFocus();
  });

  it("should navigate to docs", () => {
    const route = `/docs/${data.docs[0]}`;
    render(<Search data={data} />);

    fireEvent.keyUp(document, { key: "Enter" });

    expect(push).toHaveBeenCalledWith(route);
  });
});
