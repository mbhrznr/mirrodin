import { RedirectType } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";

import Search from "~/components/search/search";
import type { SearchError, SearchResult } from "~/types/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const PLACEHOLDER = [
  "a solution in search of a problem.",
  "a step in one direction is two steps away from another.",
  "an empty canvas holds infinite possibilities.",
  "forged from what it forges.",
  "life is ephermal. phyrexia is eternal.",
  "life is eternal. a lifetime is ephermal.",
  "reduce. reuse. wreak havoc.",
];

type PageProps = {
  params: {};
  searchParams: { q?: string };
};

async function fetcher<D, E>(
  query: string
): Promise<{ data: D; error: undefined } | { data: undefined; error: E }> {
  try {
    const response = await fetch(`http://localhost:3001/search?q=${query}`);
    const json = await response.json();

    if (response.status >= 400) {
      return { data: undefined, error: json };
    }

    return { data: json, error: undefined };
  } catch (error) {
    return { data: undefined, error: error as E };
  }
}

export default async function Page({ searchParams }: PageProps) {
  const day = new Date().getDay();
  const placeholder = PLACEHOLDER?.[day];
  const query = searchParams?.["q"] ?? "";
  const { data, error } = await fetcher<SearchResult, SearchError>(query);

  async function action(form: FormData) {
    "use server";

    const data = Object.fromEntries(form);

    redirect(data?.q ? `/?q=${data.q}` : `/`, RedirectType.push);
  }

  return (
    <main>
      <h1>mirrodin</h1>
      <section>
        <Search
          form={{ action }}
          data={data}
          error={error}
          input={{
            "aria-invalid": !!error,
            "aria-describedby": "error",
            name: "q",
            defaultValue: query,
            placeholder,
          }}
        />
      </section>
    </main>
  );
}
