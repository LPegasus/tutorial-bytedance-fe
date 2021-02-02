import { makeStyles, Theme } from '@material-ui/core';
import { humanizeCommentsCount, humanizePublishedAt } from '@sjtu-fe/utility';
import { CardDescription } from '@src/ui/CardDescription';
import { Tag } from '@src/ui/Tag';

import { CardContainer } from './CardContainer';

import type { CardEntity } from './type';

const useStyles = makeStyles<Theme, TitleCardPropsType>((theme) => {
  const s1 = theme.spacing(1);
  const s2 = theme.spacing(2);
  const s05 = theme.spacing(0.5);
  return {
    root: (props) => ({
      '&:first-of-type': {
        marginTop: `${s1}px`,
      },
      '&:last-child::after': {
        display: 'block',
        boxSizing: 'content-box',
        height: 0,
        marginTop: s1,
        content: '" "',
        width: '100%',
        borderBottom: `1px solid ${theme.palette.grey[200]}`,
      },
      padding: `0 ${s2}px`,
      contain: 'content',
      contentVisibility: 'auto',
    }),
    anchor: {
      textDecoration: 'none',
      display: 'block',
      color: theme.palette.grey[100],
    },
    detail: {
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
    desc: {
      display: 'flex',
      marginLeft: 0,
      '& *:not(:last-child)': {
        marginRight: s1,
      },
    },
  };
});

export function TitleCard(props: TitleCardPropsType) {
  const {
    data: { id, title, isPinTop = false, publishedAt, author, commentsCount },
  } = props;
  const classes = useStyles(props);

  return (
    <CardContainer id={id} classes={classes}>
      <div className={classes.content}>
        <h3 className={classes.title}>{title}</h3>
        <div className={classes.desc}>
          {isPinTop && <Tag text="置顶" />}
          <CardDescription
            text={`${author} 评论 ${humanizeCommentsCount(
              commentsCount
            )} ${humanizePublishedAt(publishedAt)}`}
          />
        </div>
      </div>
    </CardContainer>
  );
}

export type TitleCardPropsType = {
  data: CardEntity;
};
