import { AST } from "../types/types";

/**
 * flatten.
 *
 * recursive function.
 * returns flat value of given ast.
 */
export default function flatten(ast: AST): string {
  let flat = "";
  if (ast.value) {
    flat += `${ast.value}`;
  }
  if (ast.children) {
    for (const child of ast.children) {
      flat += flatten(child);
    }
  }

  return flat;
}
