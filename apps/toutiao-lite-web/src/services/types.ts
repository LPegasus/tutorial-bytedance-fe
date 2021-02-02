import type { CardEntity } from '@src/ui/Card/type';

export enum StatusCode {
  Success = 0,
  Error = 1,
}

export interface BaseResponse<T> {
  status: StatusCode;
  data: T;
}

export interface CardListRequest {
  cursor: string;
  size?: number;
}

export interface CardListResponse {
  /** 是否有更多数据 */
  hasMore: boolean;
  cursor: string;
  list: CardEntity[];
}

export interface AuthorEntity {
  /** 账号名称 */
  name: string;
  /** 备注说明 */
  remark: string;
  /** 头像 */
  avatarUrl: string;
  /** 是否关注 */
  fav: boolean;
}

export interface CommentEntity {
  /** 评论用户 */
  author: Pick<AuthorEntity, 'name' | 'avatarUrl'>;
  /** 点赞数 */
  favCount: number;
  /** 评论内容 */
  comment: string;
  /** 回复数 */
  replyCount: number;
}

export interface ArticleDetailEntity {
  id: string;
  title: string;
  contentNode: ArticleNode;
  author: AuthorEntity;
  comments: CommentEntity[];
}

export type ContentNode = ParagraphNode | VideoNode | ImageNode;

export interface ArticleNode {
  type: 'article';
  children?: ContentNode[];
}

export interface ParagraphNode {
  type: 'p';
  children: string;
}

export interface VideoNode {
  type: 'video';
  attributes: {
    source: Array<{ type: 'video/webm' | 'video/mp4'; src: string }>;
    coverUrl: string;
  };
}

export interface ImageNode {
  type: 'img';
  attributes: {
    src: string;
    alt?: string;
  };
}
