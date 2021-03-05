import { Avatar, Link, makeStyles, Typography } from '@material-ui/core';
import { ArrowForwardIos } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles((theme) => {
  return {
    userBanner: {
      padding: '14px 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& > div': {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
    },
    userAvatar: {
      marginRight: '14px',
    },
    userHomeLink: {
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.text.disabled,
    },
    arrow: {
      position: 'relative',
      top: -1,
      fontSize: '14px',
    },
  };
});

export function User() {
  const classes = useStyles();
  return (
    <div className={classes.userBanner}>
      <div>
        <Avatar
          className={classes.userAvatar}
          variant="circular"
          src="https://images.unsplash.com/photo-1488654715439-fbf461f0eb8d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        />
        <Typography variant="subtitle1">数字用户 66666666</Typography>
      </div>
      <Link className={classes.userHomeLink} variant="body2">
        个人主页 <ArrowForwardIos className={classes.arrow} />
      </Link>
    </div>
  );
}
