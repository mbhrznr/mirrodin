import type { FC } from "react";
import CodeBlock from "./code.block";
import CodeInline from "./code.inline";

/**
 * code
 *
 * to be used in `ReactMarkdown`
 */
export default (function Code({ children, inline, ...props }) {
  return inline ? (
    <CodeInline {...props}>{children}</CodeInline>
  ) : (
    <CodeBlock {...props}>{children}</CodeBlock>
  );
} satisfies FC<
  JSX.IntrinsicElements["code"] & {
    inline?: boolean;
  }
>);
