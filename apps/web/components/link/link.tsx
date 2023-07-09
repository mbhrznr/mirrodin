import BaseLink from "next/link";
import type { LinkProps } from "next/link";
import { forwardRef } from "react";
import type { FC, PropsWithRef } from "react";

import styles from "./link.styles.module.css";

/**
 * link
 *
 * to be used in `ReactMarkdown`
 */
export default forwardRef(function Link({ children, ...props }, ref) {
  return (
    <BaseLink {...(props as LinkProps)} className={styles.link} ref={ref}>
      {children}
    </BaseLink>
  );
}) satisfies FC<PropsWithRef<JSX.IntrinsicElements["a"] & LinkProps>>;
