import { useRouter } from 'next/router';
import { memo } from 'react';

import { humanizeCommentsCount, humanizePublishedAt } from '@sjtu-fe/utility';

import { CardDescription } from '../CardDescription';
import { Tag } from '../Tag';
import { useCardStyles } from './useCardStyles';

import type { CardEntity } from './type';

export function VideoCard(props: VideoCardPropsType) {
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
  const router = useRouter();

  return (
    <section className={classes.root}>
      <a
        href={`/detail/${id}`}
        className={classes.anchor}
        onClick={(e) => {
          e.preventDefault();
          const href = e.currentTarget.href;
          router.push(href);
        }}
      >
        <div className={classes.detail}>
          <div className={classes.content}>
            <h3 className={classes.title}>{title}</h3>
            <div className={classes.bannerPic}>
              <div>
                <img src={imgUrls[0]} />
              </div>
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
        </div>
      </a>
    </section>
  );
}

export const MemoizedVideoCard = memo(VideoCard);

export type VideoCardPropsType = {
  /** 卡片数据 */
  data: CardEntity;
};
