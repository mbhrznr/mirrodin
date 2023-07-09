import { render } from "@testing-library/react";

import Image from "./image";

describe("Link", () => {
  it("should render", () => {
    const { container } = render(
      <Image alt="image" src="/assets/asset.webp" />
    );

    expect(container).toBeTruthy();
  });
});
