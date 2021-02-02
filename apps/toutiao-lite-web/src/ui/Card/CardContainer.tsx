import { useRouter } from 'next/router';

import { useCardStyles } from './useCardStyles';

import type { PropsWithChildren } from 'react';

export function CardContainer(
  props: PropsWithChildren<CardContainerPropsType>
) {
  const classes = props.classes || useCardStyles();
  const router = useRouter();
  const { id } = props;
  return (
    <section className={classes.root}>
      <a
        href={`/post/${id}`}
        className={classes.anchor}
        onClick={(e) => {
          e.preventDefault();
          const href = e.currentTarget.href;
          router.push(href);
        }}
      >
        <div className={classes.detail}>{props.children}</div>
      </a>
    </section>
  );
}

export type CardContainerPropsType = {
  /** Post ID */
  id: string;
  classes?: Record<string, string>;
};
