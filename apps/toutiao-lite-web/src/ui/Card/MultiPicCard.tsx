import { useRouter } from 'next/router';
import { memo } from 'react';

import { humanizeCommentsCount, humanizePublishedAt } from '@sjtu-fe/utility';

import { CardDescription } from '../CardDescription';
import { Tag } from '../Tag';
import { CardContainer } from './CardContainer';
import { useCardStyles } from './useCardStyles';

import type { CardEntity } from './type';

export function MultiPicCard(props: MultiPicCardPropsType) {
  const {
    data: {
      id,
      imgUrls = [],
      title,
      isPinTop = false,
      publishedAt,
      author,
      commentsCount,
    },
  } = props;
  const classes = useCardStyles();

  return (
    <CardContainer id={id}>
      <div>
        <h3 className={classes.title}>{title}</h3>
        <div className={classes.picList}>
          {imgUrls.map((src, i) => {
            return (
              <div key={String(i)}>
                <img src={src} title="" />
              </div>
            );
          })}
        </div>
        <div className={classes.desc}>
          {isPinTop && <Tag text="置顶" />}
          <CardDescription
            text={`${author} 评论 ${humanizeCommentsCount(
              commentsCount
            )} ${humanizePublishedAt(publishedAt)}`}
          />
        </div>
      </div>
    </CardContainer>
  );
}

/**
 * 三图卡片
 *
 * @memoized
 */
export const MemoizedMultiPicCard = memo(MultiPicCard);

export type MultiPicCardPropsType = {
  /** 卡片数据 */
  data: CardEntity;
};
