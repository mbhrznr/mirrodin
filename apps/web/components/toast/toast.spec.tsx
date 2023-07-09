import { act, render } from "@testing-library/react";

import Toast from "./toast";

jest.useFakeTimers();

describe("toast", () => {
  it("should not render initially", () => {
    const { container } = render(<Toast />);

    expect(container.querySelector('[role="alert"]')).not.toBeInTheDocument();
  });

  it("should render after dispatching custom event", () => {
    const result = "showing toast";
    const event = new CustomEvent("notification", { detail: result });
    const { getByRole, getByText } = render(<Toast />);

    act(() => {
      document.dispatchEvent(event);
    });

    expect(getByRole("alert")).toBeInTheDocument();
    expect(getByText(result)).toBeInTheDocument();
  });

  it("should hide toast after timeout", () => {
    const result = "showing toast";
    const event = new CustomEvent("notification", { detail: result });
    const { container } = render(<Toast />);

    act(() => {
      document.dispatchEvent(event);
    });

    expect(container.querySelector('[role="alert"]')).toBeInTheDocument();

    act(() => {
      jest.runAllTimers();
    });

    expect(container.querySelector('[role="alert"]')).not.toBeInTheDocument();
  });
});
