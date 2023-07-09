import { render } from "@testing-library/react";

import Logo from "./logo";

describe("logo", () => {
  it("should render", () => {
    const { container } = render(<Logo />);

    expect(container).toBeTruthy();
  });

  it("should have an aria-label", () => {
    const { container } = render(<Logo />);

    expect(container.firstChild).toHaveAttribute("aria-label");
  });
});
