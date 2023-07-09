import path from "node:path";

import lowercase from "./lowercase";

type Options = {
  delimiter?: string;
  extension?: boolean;
  lower?: boolean;
};

/**
 * slugify.
 *
 * turns (file-)name into slug.
 */
export default function slugify(name: string, options?: Options): string {
  const { delimiter = "-", lower = true, extension = false } = options ?? {};
  const slug = path
    .parse(name)
    [extension ? "base" : "name"].replaceAll(" ", delimiter);

  return lower ? lowercase(slug) : slug;
}
