import { remark } from "remark";
import gfm from "remark-gfm";

import flatten from "./flatten";

describe("flatten", () => {
  it("should flatten a simple ast", () => {
    const md = "flatten works fine";
    const ast = remark().use(gfm).parse(md);
    const result = "flatten works fine";

    expect(flatten(ast)).toBe(result);
  });

  it("should flatten a more complex ast", () => {
    const md = "# flatten *works __fine__*";
    const ast = remark().use(gfm).parse(md);
    const result = "flatten works fine";

    expect(flatten(ast)).toBe(result);
  });
});
