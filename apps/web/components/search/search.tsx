import Link from "next/link";
import type { FC } from "react";

import Logo from "~/components/logo/logo";
import type {
  SearchError as SearchErrorType,
  SearchResult,
} from "~/types/types";

import SearchError from "./search.error";
import SearchInput from "./search.input";
import SearchLegend from "./search.legend";
import SearchOutput from "./search.output";
import styles from "./search.styles.module.css";

type SearchProps = {
  data?: SearchResult;
  error?: SearchErrorType;
  form?: JSX.IntrinsicElements["form"];
  input?: JSX.IntrinsicElements["input"];
};

/**
 * search
 */
export default (function Search({ data, error, form, input }) {
  return (
    <form className={styles.form} {...form}>
      <Link href="/">
        <Logo />
      </Link>
      <SearchInput {...input} />
      {error ? <SearchError error={error} /> : <SearchLegend />}
      <SearchOutput data={data} />
    </form>
  );
} satisfies FC<SearchProps>);
