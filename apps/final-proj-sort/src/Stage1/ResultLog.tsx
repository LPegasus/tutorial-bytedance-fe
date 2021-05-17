import { usePlayingAtom } from "atom/PlayingAtom";
import { memo } from "react";
import styled from "styled-components";

export const ResultLog = memo(
  () => {
    const [playingState] = usePlayingAtom();
    const txt = `Results: ${playingState().sort.join("、")}`;
    return <Root>{txt}</Root>;
  },
  () => true
);

const Root = styled.div`
  color: #fff;
`;
