import { render } from "@testing-library/react";

import Link from "./link";

describe("Link", () => {
  it("should render", () => {
    const { container } = render(<Link href="#" />);

    expect(container).toBeTruthy();
  });

  it("should render w/ children", () => {
    const child = "child";
    const { getByText } = render(<Link href="#">{child}</Link>);

    expect(getByText(child)).toBeInTheDocument();
  });
});
