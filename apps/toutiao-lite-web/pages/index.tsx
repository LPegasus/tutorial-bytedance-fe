import React, { useState } from 'react';

import { Divider } from '@material-ui/core';
import { queryCardList } from '@src/services/card';
import { MemoizedOnePicCard, TitleCard } from '@src/ui/Card';
import { CardType } from '@src/ui/Card/type';

import type { GetServerSideProps } from 'next';
import type { CardListResponse } from '@src/services/types';

export default function Home(props: HomePropsType) {
  const [topNews] = useState(() =>
    props.data.list.filter((d) => d.type === CardType.TopNews)
  );
  const [cardListData, setCardListData] = useState(() =>
    props.data.list.filter((d) => d.type !== CardType.TopNews)
  );

  return (
    <>
      {topNews.slice(0, 3).map((datum) => {
        return <TitleCard key={datum.id} data={datum} />;
      })}
      {cardListData.map((datum) => {
        switch (datum.type) {
          case CardType.OnePic:
            return (
              <React.Fragment key={datum.id}>
                <Divider variant="middle" light={true} />
                <MemoizedOnePicCard data={datum} />
              </React.Fragment>
            );
          default:
            return null;
        }
      })}
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
