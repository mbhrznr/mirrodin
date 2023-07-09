import type { Metadata } from "next";
import Card from "~/components/card/card";
import Grid from "~/components/grid/grid";
import Link from "~/components/link/link";

import type { SearchResult } from "~/types/types";

export const metadata = {
  title: "docs",
} satisfies Metadata;

async function fetcher<D, E extends Error>(): Promise<
  { data: D; error: undefined } | { data: undefined; error: E }
> {
  try {
    const response = await fetch(`http://localhost:3001/docs`);
    const json = await response.json();

    return { data: json, error: undefined };
  } catch (error) {
    return { data: undefined, error: error as E };
  }
}

export default async function Page() {
  const { data, error } = await fetcher<SearchResult, Error>();

  return (
    <main>
      <h1>docs</h1>
      <Grid>
        {data?.docs.map(({ meta, slug }) => (
          <Link href={`/docs/${slug}`} key={slug}>
            <Card role="listitem">
              <h2>{slug}</h2>
              {meta?.description && <p>{meta.description as string}</p>}
            </Card>
          </Link>
        ))}
      </Grid>
    </main>
  );
}
