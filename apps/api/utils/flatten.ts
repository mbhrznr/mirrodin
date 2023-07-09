type AST = {
  children?: AST[];
  properties?: Record<string, unknown>;
  tagName?: string;
  type: string;
  value?: string;
};

/**
 * flatten.
 *
 * flattens the given ast to a string.
 */
export default function flatten(ast: AST) {
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
