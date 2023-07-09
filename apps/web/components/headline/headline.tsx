import { createElement, FC } from "react";

import flatten from "~/util/flatten";
import slugify from "~/util/slugify";
import type { AST } from "~/types/types";

import styles from "./headline.styles.module.css";

/**
 * headline
 *
 * to be used in `ReactMarkdown`
 */
export default (function Headline({ children, level, node, ...props }) {
  const id = slugify(flatten(node));

  return createElement(
    `h${level}`,
    { ...props, className: styles[`h${level}`], id },
    <>
      <a href={`#${id}`}>
        <svg viewBox="0 0 24 24" width="28">
          <path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z"></path>{" "}
        </svg>
      </a>
      <span>{children}</span>
    </>
  );
} satisfies FC<
  JSX.IntrinsicElements["h1" | "h2" | "h3" | "h4" | "h5" | "h6"] & {
    level: number;
    node: AST;
  }
>);
