"use client";

import { FC, useRef } from "react";

import useFocus from "~/hooks/focus/use-focus";
import useKey from "~/hooks/key/use-key";

import styles from "./search.input.styles.module.css";

export default (function SearchInput(props) {
  const ref = useRef<HTMLInputElement | null>(null);

  useFocus(ref);

  useKey("/", () => {
    if (document.activeElement !== ref.current) {
      ref.current?.focus();
    }
  });

  return (
    <input
      {...props}
      aria-label="search"
      autoCapitalize="none"
      autoComplete="off"
      className={styles.input}
      ref={ref}
      spellCheck="false"
    />
  );
} satisfies FC<JSX.IntrinsicElements["input"]>);
