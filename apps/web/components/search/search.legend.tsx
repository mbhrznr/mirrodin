import type { FC } from "react";

import Code from "~/components/code/code";

import styles from "./search.legend.styles.module.css";

/**
 * search legend
 */
export default (function SearchLegend() {
  return (
    <legend className={styles.legend}>
      <span>
        <Code inline>/</Code> to focus
      </span>
      <span>
        <Code
          inline
          style={{ margin: "0 0.125rem", padding: "0.125rem 0.25rem" }}
        >
          tab
        </Code>
        ,
        <Code
          inline
          style={{ margin: "0 0.125rem", padding: "0.125rem 0.25rem" }}
        >
          ↑
        </Code>{" "}
        or{" "}
        <Code
          inline
          style={{ margin: "0 0.125rem", padding: "0.125rem 0.25rem" }}
        >
          ↓
        </Code>{" "}
        to navigate
      </span>
      <span>
        <Code
          inline
          style={{ margin: "0 0.125rem", padding: "0.125rem 0.25rem" }}
        >
          enter
        </Code>{" "}
        to select
      </span>
    </legend>
  );
} satisfies FC);
