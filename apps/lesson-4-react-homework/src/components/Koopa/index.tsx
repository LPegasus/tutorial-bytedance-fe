import type { CSSProperties } from 'react';
import React from 'react';
import KoopaPng from '@/assets/png/kbw.png';

export interface KoopaPropsType {
  style?: CSSProperties;
  className?: string;
}

export const Koopa = React.forwardRef(function Koopa(
  props: KoopaPropsType,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div {...props} ref={ref}>
      <img width="100%" alt="" src={KoopaPng} />
    </div>
  );
});
