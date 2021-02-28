import lottie, { AnimationItem } from 'lottie-web';
import React, { CSSProperties, useEffect, useRef } from 'react';

import { useEventCallback } from './useEventCallback';

interface UseLottiePropsType {
  autoplay?: boolean;
  loop?: boolean;
  renderer?: 'svg' | 'canvas';
  animationData: any;
  style?: CSSProperties;
  className?: string;
  withRef?: (animationItem: AnimationItem | null) => void;
}

export function useLottie(props: UseLottiePropsType) {
  const { className, style, withRef = () => {}, ...lottieProps } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const withRefCallback = useEventCallback(withRef);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const animationItem = lottie.loadAnimation({
      autoplay: true, // 手动控制 play
      loop: true, // 全部设置成 true，通过事件来控制是否切换到下一个
      container,
      renderer: 'canvas',
      ...lottieProps,
    });

    withRefCallback(animationItem);

    return () => {
      animationItem.destroy();
      withRefCallback(null);
    };
  }, [lottieProps, withRefCallback]);

  return <div style={style} className={className} ref={containerRef} />;
}
