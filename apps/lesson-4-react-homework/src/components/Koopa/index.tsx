import type { CSSProperties } from '@/../../../libraries/react-components/node_modules/@types/react';
import KoopaPng from '@/assets/png/kbw.png';

export interface KoopaPropsType {
  style?: CSSProperties;
  className?: string;
}

export function Koopa(props: KoopaPropsType) {
  const { className, style } = props;

  return <div></div>;
}
