import { render } from "@testing-library/react";
import { useRouter, NextRouter } from "next/router";

import Nav from "./nav";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Nav", () => {
  it("should render", () => {
    (useRouter as jest.Mock<Partial<NextRouter>>).mockImplementation(() => ({
      route: `/`,
    }));
    const { container } = render(<Nav />);

    expect(container).toBeTruthy();
  });

  it("should have [aria-current]", () => {
    const route = "docs";
    (useRouter as jest.Mock<Partial<NextRouter>>).mockImplementation(() => ({
      route: `/${route}`,
    }));
    const { getByText } = render(<Nav />);

    expect(getByText(route)).toBeInTheDocument();
    expect(getByText(route)).toHaveAttribute("aria-current", "true");
  });
});
