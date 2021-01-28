import { makeStyles } from '@material-ui/core';
import type { Theme } from '@material-ui/core';

export const useCardStyles = makeStyles<Theme>((theme) => {
  const s1 = theme.spacing(1);
  const s2 = theme.spacing(2);
  const s05 = theme.spacing(0.5);
  return {
    root: {
      '&:first-of-type': {
        marginTop: `${s2}px`,
      },
      padding: `0 ${s2}px`,
      contain: 'content',
      contentVisibility: 'auto',
    },
    anchor: {
      textDecoration: 'none',
      display: 'block',
      color: theme.palette.grey[100],
    },
    detail: {
      padding: `${theme.spacing(1.5)}px 0`,
      display: 'flex',
      justifyContent: 'space-between',
      '&*:first-child:not(:last-child)': {
        padding: `${s2}px 0`,
      },
    },
    title: {
      fontSize: '1rem',
      color: theme.palette.grey[900],
      margin: `${s05}px 0`,
      fontWeight: 400,
      letterSpacing: '0.5pt',
      webkitLineClamp: 3,
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      webkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
    content: {
      maxWidth: '100%',
      padding: `${s05}px 0`,
      flex: '1 0 66%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    pic: {
      flex: '0 0 34%',
      display: 'flex',
      alignItems: 'center',
      '&>div': {
        width: '100%',
        paddingTop: '75%',
        position: 'relative',
        borderRadius: '4px',
        overflow: 'hidden',
        '&>img': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectPosition: 'center',
          objectFit: 'cover',
        },
      },
    },
    picList: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'center',
      overflow: 'visible',
      width: 'calc(100% + 2px)',
      '&>div': {
        flex: 1,
        padding: '0 1px',
        width: '33.33%',
        paddingTop: 'calc(33.33% * 0.75)',
        position: 'relative',
        '&>img': {
          objectFit: 'cover',
          objectPosition: 'center',
          position: 'absolute',
          left: 1,
          right: 1,
          width: 'calc(100% - 2px)',
          height: '100%',
          top: 0,
        },
      },
    },
    desc: {
      display: 'flex',
      marginLeft: 0,
      '& *:not(:last-child)': {
        marginRight: s1,
      },
    },
    bannerPic: {
      marginLeft: theme.spacing(0.75),
      width: '100%',
      '&>div': {
        position: 'relative',
        width: '100%',
        paddingTop: '60%',
        '&>img': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        },
      },
    },
  };
});

export const useOnePicStyles = makeStyles((theme) => {
  return;
});
