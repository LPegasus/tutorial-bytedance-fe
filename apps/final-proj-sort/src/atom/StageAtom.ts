import { useDebugValue } from "react";
import { makeAtom, useAtomState } from ".";

const mc =
  typeof window !== "undefined"
    ? window.location.search.match(/stage=(\d)/)
    : null;
const n = Number(mc?.[1]);

export const StageAtom = makeAtom({
  defaultValue: isNaN(n) ? 0 : n,
});

export function useStageAtom() {
  const [getStage, setStage] = useAtomState(StageAtom);
  useDebugValue(getStage(), (s) => {
    return `current stage: ${s}`;
  });
  return [
    getStage,
    {
      next() {
        setStage(getStage() + 1);
      },
      prev() {
        setStage(Math.max(0, getStage() - 1));
      },
    },
  ] as const;
}
