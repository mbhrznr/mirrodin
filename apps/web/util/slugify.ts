import path from "node:path";

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

  return lower ? slug.toLowerCase() : slug;
}
