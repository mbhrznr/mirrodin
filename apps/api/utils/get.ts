import type {
  Code,
  Heading,
  Image,
  Link,
  List,
  ListItem,
  Literal,
  Table,
  Root,
} from "mdast";
import { visit } from "unist-util-visit";

import flatten from "./flatten";

export type GetResult = Partial<
  Code | Heading | Image | Link | List | ListItem | Literal | Table
>;

/**
 * get.
 *
 * gets value and further props of given ast parents.
 */
export default function get(ast: Root, key: string): GetResult[] {
  const values: GetResult[] = [];

  visit<Root, string>(ast, key, (node) => {
    switch (key) {
      case "code": {
        const { lang, meta } = node as Code;
        values.push({ lang, meta, value: flatten(node) });
        break;
      }
      case "heading": {
        const { depth } = node as Heading;
        values.push({ depth, value: flatten(node) });
        break;
      }
      case "image": {
        const { alt, title, url } = node as Image;
        values.push({ alt, title, url, value: flatten(node) });
        break;
      }
      case "link": {
        const { title, url } = node as Link;
        values.push({ title, url, value: flatten(node) });
        break;
      }
      case "list": {
        const { ordered, spread } = node as List;
        values.push({ ordered, spread, value: flatten(node) });
        break;
      }
      case "listItem": {
        const { checked, spread } = node as ListItem;
        values.push({ checked, spread, value: flatten(node) });
        break;
      }
      case "table": {
        const { align } = node as Table;
        values.push({ align, value: flatten(node) });
        break;
      }
      case "blockquote":
      case "emphasis":
      case "inlineCode":
      case "paragraph":
      case "strong":
      case "tableCell":
      case "tableRow":
      case "text":
      default:
        values.push({ value: flatten(node) });
        break;
    }
  });

  return values;
}
