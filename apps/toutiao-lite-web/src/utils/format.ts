import dayjs from 'dayjs';

const Second = 1000;
const Minute = 60 * Second;
const Hour = 60 * Minute;
const Day = 24 * Hour;
const Week = 7 * Day;

/**
 * 人性化显示创建时间
 *
 * @example
 * ```typescript
 * const timeSpan = humanizePublishedAt(timestamp);
 * // => 刚刚、7小时前、4天前、3周前、3个月前
 * ```
 *
 * @param timestampInMs - 人性化格式化时间
 */
export function humanizePublishedAt(timestampInMs: number): string {
  const now = Date.now();
  const diff = now - timestampInMs;
  if (diff <= Hour) {
    return '刚刚';
  } else if (diff <= Day) {
    return `${(diff / Hour) | 0}小时前`;
  } else if (diff <= Week) {
    return `${(diff / Day) | 0}天前`;
  } else if (diff <= 4 * Week) {
    return `${(diff / Week) | 0}周前`;
  } else {
    return `${dayjs().diff(timestampInMs, 'months') || 1}个月前`;
  }
}

/**
 * 人性化展示评论数
 *
 * @param n - 评论数
 */
export function humanizeCommentsCount(n: number): string {
  if (n <= 1000) {
    return String(n);
  } else if (n <= 10000) {
    return (n / 1000).toPrecision(1) + 'k';
  } else {
    return (n / 10000).toPrecision(1) + 'w';
  }
}
