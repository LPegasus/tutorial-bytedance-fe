import React from 'react';
import {
  ButtonBase,
  makeStyles,
  Paper,
  Typography,
  Grid,
  Container,
} from '@material-ui/core';
import {
  InsertChartOutlined,
  AttachMoneyOutlined,
  EmojiObjectsOutlined,
  DraftsOutlined,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '12px',
    padding: '16px 0',
  },
  btn: {
    flexBasis: '50px',
    height: '50px',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.text.hint,
    '& svg': {
      opacity: 0.8,
    },
  },
  wrap: {
    paddingTop: 12,
  },
  tip: {
    color: theme.palette.text.primary,
  },
}));

export function Creator() {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={0}>
      <Container>
        <Grid container={true} justify="space-between" alignItems="center">
          <Grid item={true}>
            <Typography variant="subtitle2">创作中心</Typography>
          </Grid>
        </Grid>
      </Container>
      <Grid container={true} justify="space-evenly" className={classes.wrap}>
        <Grid item={true} component={ButtonBase} className={classes.btn}>
          <EmojiObjectsOutlined />
          <Typography variant="caption" className={classes.tip}>
            创作首页
          </Typography>
        </Grid>
        <Grid item={true} component={ButtonBase} className={classes.btn}>
          <InsertChartOutlined />
          <Typography variant="caption" className={classes.tip}>
            数据助手
          </Typography>
        </Grid>
        <Grid item={true} component={ButtonBase} className={classes.btn}>
          <AttachMoneyOutlined />
          <Typography variant="caption" className={classes.tip}>
            收益规则
          </Typography>
        </Grid>
        <Grid item={true} component={ButtonBase} className={classes.btn}>
          <DraftsOutlined />
          <Typography variant="caption" className={classes.tip}>
            草稿箱
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
