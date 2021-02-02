import React, { useState } from 'react';

import { Box } from '@material-ui/core';
import { AppBar } from '@src/AppBar';
import { queryCardList } from '@src/services/card';
import {
  MemoizedMultiPicCard,
  MemoizedOnePicCard,
  MemoizedVideoCard,
  TitleCard,
} from '@src/ui/Card';
import { CardWrapper } from '@src/ui/Card/CardWrapper';
import { CardType } from '@src/ui/Card/type';

import type { GetServerSideProps } from 'next';
import type { CardListResponse } from '@src/services/types';
const bottomPlaceholderStyle = {
  height: '70px',
};

export default function Home(props: HomePropsType) {
  const [topNews] = useState(() =>
    props.data.list.filter((d) => d.type === CardType.TopNews)
  );
  const [cardListData, setCardListData] = useState(() =>
    props.data.list.filter((d) => d.type !== CardType.TopNews)
  );

  return (
    <>
      <AppBar />
      <Box pt="48px">
        {topNews.slice(0, 3).map((datum) => {
          return <TitleCard key={datum.id} data={datum} />;
        })}
        {cardListData.map((datum) => {
          switch (datum.type) {
            case CardType.OnePic:
              return (
                <CardWrapper key={datum.id}>
                  <MemoizedOnePicCard data={datum} />
                </CardWrapper>
              );
            case CardType.MultiPic:
              return (
                <CardWrapper key={datum.id}>
                  <MemoizedMultiPicCard data={datum} />
                </CardWrapper>
              );
            case CardType.Video:
              return (
                <CardWrapper key={datum.id}>
                  <MemoizedVideoCard data={datum} />
                </CardWrapper>
              );
            default:
              return null;
          }
        })}
        <div style={bottomPlaceholderStyle} />
      </Box>
    </>
  );
}

export interface HomePropsType {
  data: CardListResponse;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const resp = await queryCardList();
  return {
    props: {
      data: resp.data,
    },
  };
};
