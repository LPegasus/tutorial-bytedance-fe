import { usePlayingAtom, usePlayingRandom } from "atom/PlayingAtom";
import { CARD_SIZE } from "../constants";
import { memo, useEffect, useState } from "react";
import styled from "styled-components";

import { ResultLog } from "./ResultLog";
import { MemoizedCard } from "../Card";
import { FixedByViewport } from "../FixedByViewport";

export function Stage1() {
  const [playingState] = usePlayingAtom();
  const members = usePlayingRandom();
  const total = playingState().total;
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    if (!members?.length) {
      return;
    }
    const width = window.innerWidth;
    setRowCount(Math.floor((width - 40) / (CARD_SIZE.width + 20)));
  }, [total]);

  return rowCount > 0 ? (
    <Container>
      <div className="camera">
        {(members ?? []).map((d, i) => {
          const col = i % rowCount;
          const row = Math.floor(i / rowCount);
          return (
            <FixedByViewport
              key={d}
              x={col * (CARD_SIZE.width + 20) + 40}
              y={row * (CARD_SIZE.height + 20) + 100}
            >
              <MemoizedCard>{d}</MemoizedCard>
            </FixedByViewport>
          );
        })}
      </div>
      <ResultLog />
    </Container>
  ) : null;
}

export const MemoStage1 = memo(Stage1, () => true);

export type Stage1PropsType = {};

const Container = styled.div`
  width: 100%;
  left: 100%;
  box-sizing: border-box;

  .camera {
    position: relative;
    perspective: 800px;
    transform-style: preserve-3d;
    perspective-origin: top left;
  }
`;
