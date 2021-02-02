import { makeStyles } from '@material-ui/core';

import { ArticleContent } from './ArticleContent';
import { ArticleHeader } from './ArticleHeader';

import type { ArticleDetailEntity } from '@src/services/types';

export function Article(props: ArticlePropsType) {
  const {
    data: { author, title, contentNode },
  } = props;
  return (
    <>
      <ArticleHeader {...author} title={title} />
      <ArticleContent rootNode={contentNode} />
    </>
  );
}

export interface ArticlePropsType {
  data: ArticleDetailEntity;
}
