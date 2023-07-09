/**
 * normalize.
 *
 * normalizes string by removing prefix.
 *
 * [prefix:]id
 */
export default function normalize(string: string = "", prefix = "docs:") {
  return string.replace(prefix, "");
}
