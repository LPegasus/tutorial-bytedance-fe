export type CardEntity = {
  /** 标题 */
  title: string;
  /** 是否【置顶】 */
  isPinTop?: boolean;
  /** 发布时间 */
  publishedAt: number;
  /** 发布人 */
  author: string;
  /** 评论数 */
  commentsCount: number;
  /** 图片 url 数组 */
  imgUrls?: string[];
  /** 详情 ID */
  id: string;
  /** 卡片类型 */
  type: CardType;
};

/**
 * 卡片类型
 */
export enum CardType {
  /** 置顶新闻 */
  TopNews = 0,
  /** 一图卡片 */
  OnePic = 1,
  /** 多图卡片 */
  MultiPic = 2,
  /** 视频卡片 */
  Video = 3,
}
