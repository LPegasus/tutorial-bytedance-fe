import React from 'react';
import { ButtonBase, makeStyles, Paper, Typography } from '@material-ui/core';
import {
  NotificationsActiveOutlined,
  StarBorder,
  CloudDownloadOutlined,
  HistoryOutlined,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '16px 0',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  btn: {
    flexBasis: '50px',
    height: '50px',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.primary.main,
    '& svg': {
      opacity: 0.8,
    },
  },
  tip: {
    color: theme.palette.text.primary,
  },
}));

export function CommonToolBar() {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={0}>
      <ButtonBase className={classes.btn}>
        <NotificationsActiveOutlined />
        <Typography variant="caption" className={classes.tip}>
          消息通知
        </Typography>
      </ButtonBase>
      <ButtonBase className={classes.btn}>
        <StarBorder />
        <Typography variant="caption" className={classes.tip}>
          收藏
        </Typography>
      </ButtonBase>
      <ButtonBase className={classes.btn}>
        <HistoryOutlined />
        <Typography variant="caption" className={classes.tip}>
          历史
        </Typography>
      </ButtonBase>
      <ButtonBase className={classes.btn}>
        <CloudDownloadOutlined />
        <Typography variant="caption" className={classes.tip}>
          下载管理
        </Typography>
      </ButtonBase>
    </Paper>
  );
}
