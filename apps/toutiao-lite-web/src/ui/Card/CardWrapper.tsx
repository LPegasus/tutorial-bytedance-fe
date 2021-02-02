import { Divider } from '@material-ui/core';

import type { PropsWithChildren } from 'react';

/**
 * 带上分割线的 Card 容器
 *
 * @param props
 */
export function CardWrapper(props: PropsWithChildren<CardWrapperPropsType>) {
  const { children } = props;
  return (
    <>
      <Divider variant="middle" light={true} />
      {children}
    </>
  );
}

export type CardWrapperPropsType = {};
