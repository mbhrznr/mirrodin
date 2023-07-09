import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import type { SpecialComponents } from "react-markdown/lib/ast-to-react";
import type { NormalComponents } from "react-markdown/lib/complex-types";
import gfm from "remark-gfm";

import Code from "~/components/code/code";
import Headline from "~/components/headline/headline";
import Image from "~/components/image/image";
import Link from "~/components/link/link";
import Paragraph from "~/components/paragraph/paragraph";
import type { SearchResult } from "~/types/types";

type PageProps = {
  params: { slug: string };
  searchParams: { q?: string };
};

type Components =
  | Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents>
  | undefined;

type FetcherResult = {
  content: string;
  meta: SearchResult["docs"][number]["meta"];
};

const components = {
  a: Link,
  code: Code,
  img: Image,
  h1: Headline,
  h2: Headline,
  h3: Headline,
  h4: Headline,
  h5: Headline,
  h6: Headline,
  p: Paragraph,
};
const disallowedElements = ["pre"];

async function fetcher<D, E extends Error>(
  doc: string
): Promise<{ data: D; error: undefined } | { data: undefined; error: E }> {
  try {
    const response = await fetch(`http://localhost:3001/docs/${doc}`);
    const json = await response.json();

    return { data: json, error: undefined };
  } catch (error) {
    return { data: undefined, error: error as E };
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { data } = await fetcher<FetcherResult, Error>(params.slug);

  return {
    description: data?.meta?.description,
    title: "docs",
  } satisfies Metadata;
}

export default async function Page({ params }: PageProps) {
  const { data, error } = await fetcher<FetcherResult, Error>(params.slug);

  return (
    <main>
      <ReactMarkdown
        components={components as Components}
        disallowedElements={disallowedElements}
        remarkPlugins={[gfm]}
        unwrapDisallowed
      >
        {data?.content ?? ""}
      </ReactMarkdown>
    </main>
  );
}
