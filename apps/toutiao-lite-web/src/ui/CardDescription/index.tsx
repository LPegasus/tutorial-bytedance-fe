import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(
  (theme) => {
    return {
      root: {
        fontFamily: theme.typography.body1.fontFamily,
        display: 'inline-block',
        height: 12,
        width: '100%',
        '& text': {
          fill: theme.palette.primary.main,
        },
      },
    };
  },
  {
    name: 'card-desc',
  }
);

/**
 * Card 底部小字，展示评论数。因为小于 12px，所以使用 svg 实现
 *
 * @param props - CardDescription 组件传参
 */
export function CardDescription(props: CardDescriptionPropsType) {
  const classes = useStyles();
  const { text } = props;
  return (
    <svg className={classes.root}>
      <text font-size="10" y="10">
        {text}
      </text>
    </svg>
  );
}

export type CardDescriptionPropsType = {
  /** 文案 */
  text: string;
};
