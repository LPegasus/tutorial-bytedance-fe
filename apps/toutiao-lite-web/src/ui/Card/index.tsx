import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core';
import { humanizeCommentsCount, humanizePublishedAt } from '@src/utils/format';

import { CardDescription } from '@src/ui/CardDescription';
import { Tag } from '@src/ui/Tag';

const useStyles = makeStyles((theme) => {
  const s1 = theme.spacing(1);
  const s2 = theme.spacing(2);
  const s05 = theme.spacing(0.5);
  return {
    root: {
      padding: `0 ${s2}px`,
      contain: 'content',
      contentVisibility: 'auto',
      marginBlock: '1rem',
      '&:first-of-type': {
        marginTop: 0,
      },
    },
    anchor: {
      textDecoration: 'none',
      display: 'block',
      color: theme.palette.grey[100],
    },
    detail: {
      display: 'flex',
      justifyContent: 'space-between',
      '&*:first-child:not(:last-child)': {
        padding: `${s2}px 0`,
      },
    },
    title: {
      color: theme.palette.grey[900],
      fontWeight: 400,
      letterSpacing: '0.12ch',
      webkitLineClamp: 3,
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      webkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
    content: {
      maxWidth: '100%',
      paddingBlock: s05,
      flex: '1 0 66%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    pic: {
      flex: '0 0 34%',
      display: 'flex',
      alignItems: 'center',
      '&>div': {
        width: '100%',
        paddingTop: '75%',
        position: 'relative',
        '&>img': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectPosition: 'center',
          objectFit: 'cover',
        },
      },
    },
    picList: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'center',
      overflow: 'visible',
      width: 'calc(100% + 2px)',
      '&>div': {
        flex: 1,
        padding: '0 1px',
        width: '33.33%',
        paddingTop: 'calc(33.33% * 0.75)',
        position: 'relative',
        '&>img': {
          objectFit: 'cover',
          objectPosition: 'center',
          position: 'absolute',
          left: 1,
          right: 1,
          width: 'calc(100% - 2px)',
          height: '100%',
          top: 0,
        },
      },
    },
    desc: {
      display: 'flex',
      marginLeft: 0,
      '& *:not(:last-child)': {
        marginRight: s1,
      },
    },
    bannerPic: {
      marginLeft: theme.spacing(0.75),
      width: '100%',
      '&>div': {
        position: 'relative',
        width: '100%',
        paddingTop: '60%',
        '&>img': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        },
      },
    },
  };
});

export function Card(props: CardPropsType) {
  const {
    id,
    imgUrls,
    title,
    isPinTop,
    publishedAt,
    author,
    commentsCount,
  } = props;
  const classes = useStyles();
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
        </div>
      </a>
    </section>
  );
}

export type CardPropsType = {
  /** 标题 */
  title: string;
  /** 是否【置顶】 */
  isPinTop: boolean;
  /** 发布时间 */
  publishedAt: number;
  /** 发布人 */
  author: string;
  /** 评论数 */
  commentsCount: number;
  /** 图片 url 数组 */
  imgUrls: string[];
  /** 详情 ID */
  id: string;
};
