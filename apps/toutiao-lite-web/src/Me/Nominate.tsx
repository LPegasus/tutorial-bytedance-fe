import React, { useState } from 'react';
import {
  Paper,
  makeStyles,
  Container,
  Grid,
  Tabs,
  Tab,
  Link,
  Typography,
} from '@material-ui/core';
import { ArrowForwardIosOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '12px',
    padding: '16px 0',
  },
  link: {
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.disabled,
  },
  arrow: {
    position: 'relative',
    top: '1px',
    fontSize: '12px',
  },
  horizontalScroll: {
    paddingTop: '12px',
    paddingBottom: '8px',
    overflowY: 'hidden',
    width: '100%',
    whiteSpace: 'nowrap',
    touchAction: 'pan-x',
    '&>div': {
      marginRight: '12px',
      display: 'inline-block',
      width: '120px',
      '&>img': {
        overflow: 'hidden',
        borderRadius: '4px',
        width: '100%',
        height: '80px',
        objectFit: 'cover',
        objectPosition: 'center',
      },
    },
  },
}));

const useTabStyle = makeStyles((theme) => ({
  root: {
    textTransform: 'none',
    margin: 0,
    padding: 0,
    paddingRight: '12px',
    height: '24px',
    boxSizing: 'border-box',
    minHeight: 'unset',
    minWidth: '0',
  },
}));

const useTabsStyle = makeStyles({
  root: {
    boxSizing: 'border-box',
    minHeight: 'unset',
    height: '24px',
  },
  indicator: {
    display: 'none',
  },
});

export function Nominate() {
  const classes = useStyles();
  const tabClasses = useTabStyle();
  const tabsClasses = useTabsStyle();
  const [activeTab, setActiveTab] = useState('1');
  return (
    <Paper className={classes.root} elevation={0}>
      <Container>
        <Grid container={true} justify="space-between" alignItems="center">
          <Grid item={true}>
            <Tabs
              classes={tabsClasses}
              value={activeTab}
              onChange={(_, v) => {
                setActiveTab(v);
              }}
            >
              <Tab
                classes={tabClasses}
                value="1"
                label="放映厅"
                disableTouchRipple={true}
              />
              <Tab
                classes={tabClasses}
                value="2"
                label="专栏"
                disableTouchRipple={true}
              />
            </Tabs>
          </Grid>
          <Grid item={true}>
            <Link className={classes.link}>
              全部 <ArrowForwardIosOutlined className={classes.arrow} />
            </Link>
          </Grid>
        </Grid>
        <div className={classes.horizontalScroll}>
          <div>
            <img src="https://images.unsplash.com/photo-1523215108660-3fdf7932d7a5?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1345&q=80" />
            <Typography variant="body1">标题一</Typography>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1521737451536-00a86f630f3e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80" />
            <Typography variant="body1">标题二</Typography>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1614938355255-24b2f86f3801?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" />
            <Typography variant="body1">标题三</Typography>
          </div>
        </div>
      </Container>
    </Paper>
  );
}
