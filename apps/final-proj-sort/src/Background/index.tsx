import { memo } from "react";
import styled from "styled-components";

export function Background() {
  return <Root />;
}

export const MemoBackground = memo(Background, () => true);

const Root = styled.section.attrs({
  id: "background-root",
})`
  background-color: #111;
  z-index: -1;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-attachment: fixed;
`;
