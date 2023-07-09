import type { FC } from "react";
import type { SearchError as SearchErrorType } from "~/types/types";

import styles from "./search.error.styles.module.css";

type SearchErrorProps = {
  error: SearchErrorType;
};

/**
 * search error
 *
 * extracted for structural reasons
 */
export default (function SearchError({ error }) {
  return (
    <p className={styles.p}>
      <i>{error?.name}:</i> {error?.message}
    </p>
  );
} satisfies FC<SearchErrorProps>);
