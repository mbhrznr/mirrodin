import BaseImage from "next/image";
import type { ImageProps } from "next/image";
import type { FC } from "react";

import Card from "../card/card";

/**
 * image
 *
 * simple wrapper for `next/image`
 */
export default (function Image({ children, ...props }) {
  return (
    <Card style={{ height: "20vh" }}>
      <BaseImage {...(props as ImageProps)} fill>
        {children}
      </BaseImage>
    </Card>
  );
} satisfies FC<JSX.IntrinsicElements["img"]>);
