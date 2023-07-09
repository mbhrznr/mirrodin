import { FC, useEffect, useState } from "react";

import useCustomEvent from "~/hooks/custom-event/use-custom-event";

import styles from "./toast.styles";

const DELAY = 3_500;

export default (function Toast(): JSX.Element {
  const [visible, setVisible] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  useCustomEvent<string>("notification", ({ detail }) => {
    setText(detail);
    setVisible(true);
  });

  useEffect(() => {
    if (!visible) {
      return;
    }

    const timeout = setTimeout(() => setVisible(false), DELAY);

    return () => clearTimeout(timeout);
  }, [visible]);

  return visible ? (
    <>
      <div role="alert">{text}</div>
      <style jsx>{styles}</style>
    </>
  ) : (
    <></>
  );
} satisfies FC);
