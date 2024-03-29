import type { FC } from "react";

import styles from "./logo.styles.module.css";

/**
 * logo
 */
export default (function Logo(): JSX.Element {
  return (
    <svg
      aria-label="logo"
      className={styles.svg}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="32"
      viewBox="0 0 27 32"
    >
      <path
        fill="var(--theme-icon)"
        d="M13.36 4.626c-6.282 0-11.375 5.092-11.375 11.374s5.092 11.375 11.375 11.375c6.282 0 11.375-5.092 11.375-11.375s-5.093-11.374-11.375-11.374zM26.715 16c0 7.378-5.98 13.355-13.355 13.355s-13.355-5.977-13.355-13.355c0-7.376 5.98-13.355 13.355-13.355s13.355 5.98 13.355 13.355zM11.715 22.633v-4.75l4.115-2.377 4.114 2.377v4.38l1.806-1.040v-9.724l-8.422-4.864-8.422 4.864v9.724l8.422 4.861 2.182-1.258-3.796-2.193z"
      />
    </svg>
  );
} satisfies FC);
