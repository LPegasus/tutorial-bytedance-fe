import React, { useEffect, useRef } from 'react';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';

import animationData from '@/assets/lottie/mario-run.json';
import { useLottie } from '@sjtu-fe/react-components';

const initialOffsetY = '30px';

export const MemoMario = React.memo(Mario);

export function Mario() {
  const elm = useLottie({
    animationData,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    let jumping = false;
    const subscription = fromEvent<KeyboardEvent>(document.body, 'keypress')
      .pipe(filter((e: KeyboardEvent) => e.code === 'Space'))
      .subscribe((e) => {
        if (jumping) {
          return;
        }
        jumping = true;
        const animation = container.animate(
          [
            {
              transform: `translate3d(0,${initialOffsetY},0)`,
            },
            {
              transform: `translate3d(0,-50px,0)`,
            },
          ],
          {
            easing: 'cubic-bezier(.27,.82,.61,1)',
            duration: 300,
            direction: 'alternate',
            fill: 'both',
            iterations: 2,
          }
        );
        animation.onfinish = () => {
          jumping = false;
        };
      });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <div
      style={{
        contain: 'strict',
        height: '150px',
        width: '300px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          willChange: 'transform',
          transform: `translate3d(0,${initialOffsetY},0)`,
          height: '150px',
          width: '300px',
          fontSize: 0,
        }}
        ref={containerRef}
      >
        {elm}
      </div>
    </div>
  );
}
