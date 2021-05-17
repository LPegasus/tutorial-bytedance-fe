import { useAtomUpdater } from "atom";
import { PlayingAtom } from "atom/PlayingAtom";
import { useStageAtom } from "atom/StageAtom";
import {
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

import { TEAM_LIST } from "../constants";
import { MemoizedQuestion } from "./Question";

function Stage0() {
  const [, stageMng] = useStageAtom();
  const [show, setShow] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const setPlayingState = useAtomUpdater(PlayingAtom);

  const handleQuestionOnShow = useCallback(() => setShowInput(true), []);
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    const n = Number((e.target as HTMLInputElement).value);

    if (e.code === "Enter" && !isNaN(n)) {
      setPlayingState((s) => ({
        ...s,
        total: n,
      }));
      stageMng.next();
      setShow(false);
    }
  };

  useEffect(() => {
    const input = inputRef.current;
    if (!input) {
      return;
    }
    if (showInput) {
      input.focus();
    }
  }, [showInput]);

  return (
    <Root>
      <MemoizedQuestion show={show} onShow={handleQuestionOnShow} />
      <button
        type="button"
        onClick={() => {
          setPlayingState((s) => ({
            ...s,
            teamList: TEAM_LIST,
          }));
          stageMng.next();
          setShow(false);
        }}
      >
        Start
      </button>
      {/* <input
        ref={inputRef}
        onKeyPress={handleKeyPress}
        className={showInput ? "" : "hide"}
        type="text"
        defaultValue=""
        placeholder="请输入人数"
      /> */}
    </Root>
  );
}

export const MemoStage0 = memo(Stage0);

export type Stage0PropsType = {
  count: number;
};

const Root = styled.div.attrs({
  id: "stage0-root",
})`
  padding-top: 60px;
  color: #fff;
  h1 {
    text-align: center;
    color: inherit;
  }
  input,
  button {
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 22px;
    line-height: 30px;
    text-align: center;
    padding: 8px;
    color: inherit;
    margin: 0 auto;
    border-radius: 0;
    border-bottom: 1px solid #cfcfcf;
    display: block;
    opacity: 1;
    transition: opacity ease-out 0.3s, border-bottom-color ease-out 0.3s;
    &:focus {
      border-bottom-color: #fff;
      border-bottom-width: 3px;
    }
    &.hide {
      opacity: 0;
    }
  }
`;
