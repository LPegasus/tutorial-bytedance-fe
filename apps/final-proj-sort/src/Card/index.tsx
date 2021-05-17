import { CARD_SIZE } from "../constants";
import { CSSProperties, memo, PropsWithChildren, useState } from "react";
import styled from "styled-components";
import { PlayingAtom } from "atom/PlayingAtom";
import { useAtomUpdater } from "../atom";

export function Card(props: CardPropsType) {
  const { children } = props;
  const [showBackface, toggleBackface] = useState(true);
  const updatePlayingState = useAtomUpdater(PlayingAtom);

  return (
    <CardRoot
      className={showBackface ? "backface" : undefined}
      onClick={() => {
        if (showBackface) {
          toggleBackface(false);
          updatePlayingState((v) => ({
            ...v,
            sort: v.sort.concat([children]),
          }));
        }
      }}
    >
      <div className="card-content">
        <div className="card-inner">{children}</div>
      </div>
      <div className="card-content back"></div>
    </CardRoot>
  );
}

export const MemoizedCard = memo(Card);

const CardRoot = styled.div`
  display: block;
  box-sizing: border-box;
  width: ${CARD_SIZE.width}px;
  height: ${CARD_SIZE.height}px;
  transform-style: preserve-3d;
  position: relative;
  .card-content {
    border: 2px solid #111;
    border-radius: 8px;
    padding: 8%;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    box-sizing: border-box;
    backface-visibility: hidden;
    background-color: #325ab4;
    &.back {
      background-image: url("/white-book.png");
      background-size: cover;
      transform: rotateY(180deg);
    }
    .card-inner {
      font-size: 26px;
      box-sizing: border-box;
      height: 100%;
      display: flex;
      color: #fff;
      justify-content: center;
      align-items: center;
      /* border: 2px solid #000; */
    }
  }
  transition: transform ease-out 0.3s;
  &.backface {
    transform: rotate3d(0, 1, 0, 180deg);
  }
`;

export interface CardPropsType
  extends PropsWithChildren<{
    children: string;
    style?: CSSProperties;
  }> {}
