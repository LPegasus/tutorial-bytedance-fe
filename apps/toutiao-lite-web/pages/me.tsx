import React from 'react';

import { ToolBar } from '@src/Me/ToolBar';
import { User } from '@src/Me/User';
import { Container, makeStyles } from '@material-ui/core';
import { CommonToolBar } from '@src/Me/CommonToolBar';
import { Nominate } from '@src/Me/Nominate';
import { Creator } from '@src/Me/Creator';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: 48,
    paddingBottom: 18,
  },
  wrapper: {
    backgroundColor: theme.palette.grey[200],
    minHeight: '100vh',
  },
}));

export default function MePage(props: MePagePropsType) {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <ToolBar />
      <Container className={classes.container}>
        <User />
        <CommonToolBar />
        <Nominate />
        <Creator />
      </Container>
    </div>
  );
}

export type MePagePropsType = {};
