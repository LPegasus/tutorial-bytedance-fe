import { useEffect, useRef, useState } from 'react';
import { Cube, CubePropsType } from './Cube';
import { fromEvent, interval } from 'rxjs';
import { filter, take } from 'rxjs/operators';

const countDown$ = interval(1000).pipe(take(4));

export function Counting() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);
  const [countDown, setCountDown] = useState(3);
  const [gameStatus, setGameStatus] = useState('ready');
  const [count, setCount] = useState(0);
  const [showInput, toggleInput] = useState(false);
  const currentCountRef = useRef(count);
  const metrics = questionsList[level];

  currentCountRef.current = count;

  useEffect(() => {
    const subscription = fromEvent<KeyboardEvent>(document.body, 'keypress')
      .pipe(filter((evt) => evt.key === ',' || evt.key === '.'))
      .subscribe((evt) => {
        setCount((s) => s + (evt.key === ',' ? -1 : 1));
      });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (gameStatus === 'start') {
      const sub = countDown$.subscribe((i) => {
        setCountDown(3 - i);
      });
      sub.add(() => {
        toggleInput(true);
      });
      return () => {
        sub.unsubscribe();
      };
    }
  }, [gameStatus, level]);

  return (
    <section>
      <button
        onClick={() => {
          setGameStatus('start');
        }}
      >
        START
      </button>
      <div>得分：{score}</div>
      <div>你的答案：{count}</div>
      <div>剩余时间：{countDown}秒</div>
      <Cube metrics={metrics} style={{ opacity: showInput ? 0 : 1 }} />
      <div>
        {showInput && (
          <input
            type="number"
            pattern="[\d]*"
            onChange={(e) => setCount(+e.currentTarget.value)}
          />
        )}
      </div>
      <div style={{ marginTop: '12px', opacity: showInput ? 1 : 0 }}>
        <button>下一题</button>
      </div>
    </section>
  );
}

const questionsList: Array<Required<CubePropsType>['metrics']> = [
  [
    [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
    ],
  ],
  [
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 1, 1, 0, 0],
    ],
  ],
];
