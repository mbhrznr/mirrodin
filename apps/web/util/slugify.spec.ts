import slugify from "./slugify";

describe("slugify", () => {
  it("should return name without side effects", () => {
    expect(slugify("name")).toBe("name");
  });

  it("should return file name without ending", () => {
    expect(slugify("name.md")).toBe("name");
    expect(slugify("name.with.dot.md")).toBe("name.with.dot");
  });

  it("should apply delimiter options", () => {
    expect(slugify("name with space.md")).toBe("name-with-space");
    expect(slugify("name with space.md", { delimiter: "_" })).toBe(
      "name_with_space"
    );
  });

  it("should apply extension option", () => {
    expect(slugify("name with space.md", { extension: true })).toBe(
      "name-with-space.md"
    );
  });

  it("should apply lower options", () => {
    expect(slugify("NAME")).toBe("name");
    expect(slugify("NaMe", { lower: true })).toBe("name");
    expect(slugify("NaMe", { lower: false })).toBe("NaMe");
  });
});
