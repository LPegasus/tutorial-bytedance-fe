import { useRouter } from 'next/router';
import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from '@material-ui/core';
import { HomeOutlined, Home, PersonOutline, Person } from '@material-ui/icons';
import { useMemo } from 'react';

const useStyles = makeStyles(
  (theme) => ({
    label: {
      '&.Mui-selected, & .Mui-selected': {
        fontSize: theme.typography.overline.fontSize,
      },
    },
    wrapper: {
      position: 'fixed',
      left: 0,
      paddingBottom: 14,
      right: 0,
      bottom: 0,
      minWidth: '100vw',
      maxWidth: '100vw',
    },
  }),
  {
    name: 'btb',
  }
);

export function BottomBar() {
  const classes = useStyles();
  const router = useRouter();
  const channel = useMemo(() => {
    switch (true) {
      case router.pathname.startsWith('/feeds'):
        return 'feeds';
      case router.pathname.startsWith('/me'):
        return 'me';
      default:
        return 'home';
    }
  }, [router.pathname]);

  return (
    <BottomNavigation
      className={classes.wrapper}
      showLabels={true}
      value={channel}
      onChange={(_, v) => {
        router.push('/' + v);
      }}
    >
      <BottomNavigationAction
        className={classes.label}
        label="头条"
        value="home"
        icon={channel === 'home' ? <Home /> : <HomeOutlined />}
      />
      <BottomNavigationAction
        className={classes.label}
        label="我的"
        value="me"
        icon={channel === 'me' ? <Person /> : <PersonOutline />}
      />
    </BottomNavigation>
  );
}
