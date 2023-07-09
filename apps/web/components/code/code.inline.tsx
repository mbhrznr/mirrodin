import type { FC } from "react";

import styles from "./code.inline.styles.module.css";

/**
 * CodeInline
 */
export default (function CodeInline({ children, ...props }) {
  return (
    <code {...props} className={styles.code}>
      {children}
    </code>
  );
} satisfies FC<JSX.IntrinsicElements["code"]>);
