import type { ImageProps } from "next/image";
import { FC } from "react";

import Image from "~/components/image/image";
import type { AST } from "~/types/types";

/**
 * paragraph
 *
 * to be used in `ReactMarkdown`
 */
export default (function Paragraph({ children, node }) {
  /** resolves the "`div` cannot be descendant of `p`" warning */
  if (node?.children?.[0]?.tagName === "img") {
    const { alt, src, ...props }: ImageProps = (node.children[0]?.properties ??
      {}) as ImageProps;
    return <Image alt={alt as string} src={src as string} {...props} />;
  }

  return <p>{children}</p>;
} satisfies FC<
  JSX.IntrinsicElements["p"] & {
    node: AST;
  }
>);
