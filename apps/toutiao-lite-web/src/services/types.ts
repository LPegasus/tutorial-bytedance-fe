import type { CardEntity } from '@src/ui/Card/type';

export enum StatusCode {
  Success = 0,
  Error = 1,
}

export interface BaseResponse<T> {
  status: StatusCode;
  data: T;
}

export interface CardListResponse {
  hasMore: boolean;
  list: CardEntity[];
}
