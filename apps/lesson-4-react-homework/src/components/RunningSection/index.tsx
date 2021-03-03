import { useEffect, useRef, useState } from 'react';
import { of, concat, Subject, timer } from 'rxjs';
import {
  delay,
  exhaustMap,
  filter,
  mapTo,
  switchMap,
  takeWhile,
  throttleTime,
} from 'rxjs/operators';
import styled, { keyframes } from 'styled-components';
import { useSpring, animated } from 'react-spring';

import { Koopa } from '@/components/Koopa';
import { MemoMario as Mario } from '@/components/Mario';

const StyledKoopa = styled(animated(Koopa))`
  width: 50px;
  will-change: transform;
  position: absolute;
  height: 50px;
  left: -50px;
  z-index: 1;
  top: 80px;
`;

const StyledSection = styled.section`
  position: relative;
  max-width: 600px;
  overflow: hidden;
`;

export function RunningSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [pong$] = useState(() => new Subject<number>());
  const [springProps, set] = useSpring(() => ({
    config: {
      duration: 2500,
      easing: (n: number) => n,
    },
    x: 0,
  }));

  useEffect(() => {
    const dom = sectionRef.current;
    if (!dom) {
      return;
    }
    const rightPosX = dom.getBoundingClientRect().width + 50;

    const sub = new Subject();
    sub
      .pipe(
        switchMap((_, index) => {
          return timer(5000 * Math.random()).pipe(mapTo(index));
        })
      )
      .subscribe((i) => {
        set({ x: i % 2 === 0 ? rightPosX : 0 });
        sub.next();
      });

    sub.next();
    pong$
      .pipe(
        throttleTime(15),
        filter((x) => {
          return x >= 138 && x <= 156;
        }),
        exhaustMap((s) => {
          return concat(of(true), timer(2000).pipe(mapTo(false)));
        })
      )
      .subscribe((s) => {
        if (s) {
          console.log(s, 'PONG');
        }
      });

    return () => {
      pong$.complete();
      sub.complete();
    };
  }, []);

  return (
    <StyledSection ref={sectionRef}>
      <Mario />
      <StyledKoopa
        style={{
          transform: springProps.x.interpolate((x) => {
            pong$.next(x as number);
            return `translate3d(${x}px,0,0)`;
          }),
        }}
      />
    </StyledSection>
  );
}
