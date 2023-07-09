import { render } from "@testing-library/react";

import Card from "./card";

describe("Card", () => {
  it("should render", () => {
    const { container } = render(<Card />);

    expect(container).toBeTruthy();
  });

  it("should render w/ children", () => {
    const { getByText } = render(<Card>child</Card>);

    expect(getByText("child")).toBeInTheDocument();
  });
});
