import { render } from "@testing-library/react";
import { useRouter, NextRouter } from "next/router";

import Header from "./header";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Header", () => {
  it("should render", () => {
    (useRouter as jest.Mock<Partial<NextRouter>>).mockImplementation(() => ({
      route: `/`,
    }));
    const { container } = render(<Header />);

    expect(container).toBeTruthy();
  });
});
