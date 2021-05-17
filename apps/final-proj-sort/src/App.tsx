import { Background } from "./Background";
import { MemoStage1 } from "./Stage1";
import { MemoStage0 } from "./Stage0";
import { useStageAtom } from "atom/StageAtom";

function App() {
  const [stage] = useStageAtom();
  return (
    <>
      <Background />
      {stage() === 0 && <MemoStage0 />}
      {stage() === 1 && <MemoStage1 />}
    </>
  );
}

export default App;
