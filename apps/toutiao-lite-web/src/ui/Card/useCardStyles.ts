import { makeStyles } from '@material-ui/core';

import type { Theme } from '@material-ui/core';

/**
 * 三图卡片的图片间隔，单位 px
 */
const MULTI_PIC_LIST_GAP = 1;

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
      margin: `${s05}px ${s05}px ${s05}px 0`,
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
      flex: '1 0 66%',
      boxSizing: 'border-box',
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
      borderRadius: '4px',
      overflow: 'hidden',
      marginBottom: `${s05}px`,
      marginLeft: `-${MULTI_PIC_LIST_GAP}px`,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'center',
      width: `calc(100% + ${2 * MULTI_PIC_LIST_GAP}px)`,
      '&>div': {
        flex: 1,
        padding: `0 ${MULTI_PIC_LIST_GAP}px`,
        width: '33.33%',
        paddingTop: 'calc(33.33% * 0.75)',
        position: 'relative',
        '&>img': {
          objectFit: 'cover',
          objectPosition: 'center',
          position: 'absolute',
          left: MULTI_PIC_LIST_GAP,
          right: MULTI_PIC_LIST_GAP,
          width: `calc(100% - ${2 * MULTI_PIC_LIST_GAP}px)`,
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
      width: '100%',
      '&>div': {
        position: 'relative',
        width: '100%',
        marginBottom: `${s05}px`,
        paddingTop: '50%',
        '&>img': {
          borderRadius: '4px',
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
  } as const;
});
