import { memo, useEffect } from "react";
import styled from "styled-components";
import { a, useSpring } from "react-spring";

export function Question(props: QuestionPropsType) {
  const { show, onLeave, onShow } = props;
  const [styles, springRef] = useSpring(() => ({
    opacity: 0,
    config: {
      duration: 1000,
    },
  }));

  useEffect(() => {
    let cancel = false;
    const p = springRef.start({ opacity: show ? 1 : 0 });
    if (!show) {
      Promise.all(p).then(() => {
        if (onLeave && !cancel) {
          onLeave();
        }
      });
    } else {
      Promise.all(p).then(() => {
        if (onShow && !cancel) {
          onShow();
        }
      });
    }
    return () => {
      cancel = true;
    };
  }, [show]);

  return (
    <Root style={styles}>
      <h1>开始</h1>
    </Root>
  );
}

export const MemoizedQuestion = memo(Question);

export type QuestionPropsType = {
  show?: boolean;
  onLeave?(): void;
  onShow?(): void;
};

const Root = a(styled.div.attrs({
  id: "question-txt",
})`
  color: #fff;
`);
