import { render } from "@testing-library/react";

import Headline from "./headline";

describe("Headline", () => {
  it("should render", () => {
    const value = "headline";
    const { getByText } = render(
      <Headline level={1} node={{ type: "heading", value }}>
        {value}
      </Headline>
    );

    expect(getByText(value)).toBeInTheDocument();
  });
});
