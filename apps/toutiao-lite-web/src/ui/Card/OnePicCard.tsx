import { memo } from 'react';

import { humanizeCommentsCount, humanizePublishedAt } from '@sjtu-fe/utility';

import { CardDescription } from '../CardDescription';
import { Tag } from '../Tag';
import { CardContainer } from './CardContainer';
import { useCardStyles } from './useCardStyles';

import type { CardEntity } from './type';
/**
 * 右侧一张图的卡片组件
 *
 * @param props
 */
export function OnePicCard(props: OnePicCardPropsType) {
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
      <div className={classes.content}>
        <h3 className={classes.title}>{title}</h3>
        <div className={classes.desc}>
          {isPinTop && <Tag text="置顶" />}
          <CardDescription
            text={`${author} 评论 ${humanizeCommentsCount(
              commentsCount
            )} ${humanizePublishedAt(publishedAt)}`}
          />
        </div>
      </div>
      {imgUrls?.[0] && (
        <div className={classes.pic}>
          <div>
            <img src={imgUrls[0]} />
          </div>
        </div>
      )}
    </CardContainer>
  );
}

/**
 * 右侧一张图的卡片组件
 *
 * @memoized
 * @param props
 */
export const MemoizedOnePicCard = memo(OnePicCard);

export type OnePicCardPropsType = {
  /** 卡片数据 */
  data: CardEntity;
};
