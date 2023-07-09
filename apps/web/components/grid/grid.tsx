import type { FC } from "react";

import styles from "./grid.styles.module.css";

/**
 * grid
 *
 * simple wrapper
 */
export default (function Grid({ children }) {
  return <div className={styles.div}>{children}</div>;
} satisfies FC<JSX.IntrinsicElements["div"]>);
