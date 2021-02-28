import React, { useRef, useEffect } from 'react';

import { useLottie } from '@sjtu-fe/react-components';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';

import animationData from '@/assets/lottie/mario-run.json';

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
    const subscription = fromEvent<KeyboardEvent>(document.body, 'keypress')
      .pipe(filter((e: KeyboardEvent) => e.code === 'Space'))
      .subscribe((e) => {
        container.animate(
          [
            {
              transform: 'translateY(0)',
            },
            {
              transform: 'translateY(-80px)',
            },
            {
              transform: 'translateY(0)',
            },
          ],
          {
            duration: 500,
          }
        );
      });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return <div ref={containerRef}>{elm}</div>;
}
