import type { FC } from "react";

import styles from "./card.styles.module.css";

/**
 * card
 */
export default (function Card({ children, ...props }) {
  return (
    <div {...props} className={styles.div}>
      {children}
    </div>
  );
} satisfies FC<JSX.IntrinsicElements["div"]>);
