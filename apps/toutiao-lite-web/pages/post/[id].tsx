import { Container } from '@material-ui/core';

import { getArticleDetailById } from '@src/services/card';
import { Article } from '@src/ui/Article';

import type { GetServerSideProps } from 'next';
import type { ArticleDetailEntity } from '@src/services/types';

export default function PostDetail(props: PostDetailPropsType) {
  return (
    <Container>
      <Article data={props.data} />
    </Container>
  );
}

export type PostDetailPropsType = {
  data: ArticleDetailEntity;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const resp = await getArticleDetailById(String(ctx.query.id));
  return {
    props: {
      data: resp.data,
    },
  };
};
