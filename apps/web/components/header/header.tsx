import type { FC } from "react";

import Nav from "~/components/nav/nav";

import styles from "./header.styles.module.css";

export default (function Header() {
  return (
    <header className={styles.header}>
      <Nav />
    </header>
  );
} satisfies FC);
