import { memo } from 'react';

import { makeStyles } from '@material-ui/core';

import { RenderNode } from './RenderNode';

import type { ContentNode } from '@src/services/types';

const useStyles = makeStyles({
  root: {
    lineHeight: 1.67,
    fontSize: '1rem',
    '&>article>p': {
      textIndent: '2em',
    },
    '&>article>img': {
      display: 'block',
      width: '100%',
      objectFit: 'contain',
    },
    '&>article>video': {
      width: '100%',
    },
    paddingBottom: '80px',
  },
});

export function ArticleContent(props: ArticleContentPropsType) {
  const { rootNode } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <RenderNode node={rootNode} />
    </div>
  );
}

export const MemoizedArticleContent = memo(ArticleContent);

export type ArticleContentPropsType = {
  rootNode: ContentNode;
};
