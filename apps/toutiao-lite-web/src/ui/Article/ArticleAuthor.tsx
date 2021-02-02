import { memo } from 'react';
import { Avatar, makeStyles, Button, Theme, useTheme } from '@material-ui/core';

import type { AuthorEntity } from '@src/services/types';
import { CardDescription } from '../CardDescription';

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  avatar: {
    display: 'flex',
  },
  name: (theme: Theme) => {
    return {
      marginLeft: theme.spacing(0.5),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      '&>p:first-child': {
        fontSize: theme.typography.subtitle2.fontSize,
        margin: 0,
      },
      '&>p:last-child': {
        margin: 0,
        lineHeight: 0,
      },
    };
  },
  btn: (theme: Theme) => ({
    padding: '0 5px',
    display: 'inline-block',
    height: '30px',
    lineHeight: '30px',
    fontSize: '0.7rem',
  }),
});

export function ArticleAuthor(props: ArticleAuthorPropsType) {
  const { avatarUrl, fav, name, remark } = props;
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
      <div className={classes.avatar}>
        <Avatar alt={name} src={avatarUrl}>
          {name}
        </Avatar>
        <div className={classes.name}>
          <p>{name}</p>
          <p>
            <CardDescription text={remark} />
          </p>
        </div>
      </div>
      <Button
        color="primary"
        variant={!fav ? 'contained' : 'outlined'}
        disableElevation={true}
        className={classes.btn}
      >
        {!fav ? '关注' : '取消关注'}
      </Button>
    </div>
  );
}

export const MemoizedArticleAuthor = memo(ArticleAuthor);

export type ArticleAuthorPropsType = AuthorEntity;
