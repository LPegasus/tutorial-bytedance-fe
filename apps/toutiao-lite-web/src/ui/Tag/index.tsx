import { makeStyles } from '@material-ui/core';

const useTagStyles = makeStyles((theme) => {
  return {
    root: {
      width: 32,
      height: 13,
      display: 'inline-block',
      '& rect': {
        stroke: theme.palette.primary.main,
        fill: 'none',
        strokeWidth: 1,
      },
      '& text': {
        fill: theme.palette.primary.main,
      },
    },
  };
});

export interface TagPropsType {
  /** tag 文案 */
  text: string;
}

/**
 * 置顶 tag，因为要小于 12px，使用 svg 实现
 *
 * @param props - 组件参数
 */
export function Tag(props: TagPropsType) {
  const { text } = props;
  const classes = useTagStyles();
  return (
    <svg
      className={classes.root}
      width="32px"
      height="13px"
      viewBox="0 0 78 40"
    >
      <rect x="3" y="1" rx="6" width="74" height="38" />
      <text font-size="25" x="15" y="29">
        {text}
      </text>
    </svg>
  );
}
