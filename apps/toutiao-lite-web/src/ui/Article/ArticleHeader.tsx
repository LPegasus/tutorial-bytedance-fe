import { memo } from 'react';
import { makeStyles } from '@material-ui/core';
import { ArticleAuthor } from './ArticleAuthor';

import type { ArticleAuthorPropsType } from './ArticleAuthor';

const useStyles = makeStyles({
  title: {
    contain: 'content',
    contentVisibility: 'auto',
    '&>h1': {
      fontSize: '1.5rem',
    },
  },
});

/**
 * 文章标题 + 作者栏
 *
 * @param props
 */
export function ArticleHeader(props: ArticleHeaderPropsType) {
  const { title, fav, avatarUrl, name, remark } = props;
  const classes = useStyles();
  return (
    <div className={classes.title}>
      <h1>{title}</h1>
      <ArticleAuthor
        name={name}
        avatarUrl={avatarUrl}
        fav={fav}
        remark={remark}
      />
    </div>
  );
}

export const MemoizedArticleHeader = memo(ArticleHeader);

export interface ArticleHeaderPropsType extends ArticleAuthorPropsType {
  /** 标题 */
  title: string;
}
