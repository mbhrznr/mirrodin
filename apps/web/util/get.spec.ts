import { remark } from "remark";
import gfm from "remark-gfm";

import get, { GetResult } from "./get";

describe("get", () => {
  it("should return an empty array as default", () => {
    const md = "get works fine";
    const ast = remark().use(gfm).parse(md);
    const result: GetResult[] = [];

    expect(get(ast, "heading")).toEqual(result);
  });

  it("should return a populated array for a match", () => {
    const md = "get works fine";
    const ast = remark().use(gfm).parse(md);
    const result: GetResult[] = [{ value: "get works fine" }];

    expect(get(ast, "paragraph")).toEqual(result);
  });

  it("should return a populated array for multiple matches", () => {
    const md = ["## get works fine", "## with multiple elements"].join("\n");
    const ast = remark().use(gfm).parse(md);
    const result: GetResult[] = [
      { depth: 2, value: "get works fine" },
      { depth: 2, value: "with multiple elements" },
    ];

    expect(get(ast, "heading")).toEqual(result);
  });
});
