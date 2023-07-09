import { render } from "@testing-library/react";

import mockMatchMedia from "~/test/match-media";

import Code from "./code";

describe("Code", () => {
  it("should render", () => {
    mockMatchMedia(false);
    const { container } = render(<Code />);

    expect(container).toBeTruthy();
  });
});
