"use client";

import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import type { FC } from "react";

import Link from "~/components/link/link";
import useKey from "~/hooks/key/use-key";
import type { SearchResult } from "~/types/types";

import styles from "./search.output.styles.module.css";

type SearchOutputProps = {
  data?: SearchResult;
};

/**
 * search output
 *
 * client side component
 */
export default (function SearchOutput({ data }) {
  const { push } = useRouter();
  const ref = useRef<(HTMLAnchorElement | null)[]>([]);
  const [active, setActive] = useState<number>(-1);

  useEffect(() => {
    if (ref.current?.[active]) {
      ref.current?.[active]?.focus();
    }
  }, [active]);

  useKey("Enter", () => {
    const slug = data?.docs?.[active]?.slug;

    if (slug && ref.current?.[active] === document.activeElement) {
      push(`/docs/${slug}`);
    }
  });

  useKey("ArrowUp", () => {
    if (ref.current?.[active - 1]) {
      setActive((active) => active - 1);
    } else {
      if (data?.docs?.length) {
        setActive(data.docs.length - 1 ?? 0);
      }
    }
  });

  useKey("ArrowDown", () => {
    if (ref.current?.[active + 1]) {
      setActive((active) => active + 1);
    } else {
      setActive(0);
    }
  });

  return data?.docs?.length ? (
    <output className={styles.output}>
      {data?.docs.map(({ slug }, index) => (
        <Fragment key={slug}>
          <Link
            href={`/docs/${slug}`}
            ref={(element) => {
              if (ref?.current) {
                ref.current[index] = element as HTMLAnchorElement;
              }
            }}
          >
            <svg className={styles.svg} viewBox="0 0 24 24" width="28">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
            </svg>
            {slug}
          </Link>
        </Fragment>
      ))}
    </output>
  ) : null;
} satisfies FC<SearchOutputProps>);
