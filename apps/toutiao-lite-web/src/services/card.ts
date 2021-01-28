import { CardType } from '@src/ui/Card/type';
import { BaseResponse, CardListResponse, StatusCode } from './types';

let uid = 0;

function getId() {
  return `0x${(uid++).toString(16)}`;
}

export async function queryCardList(): Promise<BaseResponse<CardListResponse>> {
  return Promise.resolve<BaseResponse<CardListResponse>>({
    status: StatusCode.Success,
    data: {
      hasMore: true,
      list: [
        {
          title: '再登达沃斯论坛 习近平释放鲜明信号',
          author: '中央网新闻',
          commentsCount: 45,
          id: getId(),
          isPinTop: true,
          type: CardType.TopNews,
          publishedAt: 1611723151000,
        },
        {
          title: '系列微视频 | 我爷爷拉二胡、唱小曲儿',
          author: '瞎吹',
          commentsCount: 666,
          id: getId(),
          type: CardType.OnePic,
          imgUrls: [
            'https://images.unsplash.com/photo-1610798352240-f1671d733c9c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
          ],
          publishedAt: 1610441293000,
        },
        {
          title: '环球网评：@纽约时报，收起你的满纸荒唐言',
          author: '环球网',
          commentsCount: 4497,
          id: getId(),
          isPinTop: true,
          type: CardType.TopNews,
          publishedAt: 1611723151000,
        },
        {
          title: '易地搬迁，稳得住能致富',
          author: '人民日报',
          commentsCount: 1203,
          id: getId(),
          type: CardType.TopNews,
          publishedAt: 1611665691000,
        },
        {
          title:
            '志愿者“组团”为居民跑腿买药：疫情让我们距离变远 却让心更近了！',
          author: '央视网新闻',
          commentsCount: 465,
          id: getId(),
          type: CardType.OnePic,
          imgUrls: [
            'https://images.unsplash.com/photo-1610798352240-f1671d733c9c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
          ],
          publishedAt: 1611644410000,
        },
        {
          title: '走开5米车就瞬间被盗！短裙长腿“黑衣女”专偷“卖菜三轮”？',
          author: '中国青年网',
          publishedAt: 1611644410000,
          commentsCount: 666,
          id: getId(),
          type: CardType.OnePic,
          imgUrls: [
            'https://images.unsplash.com/photo-1557246565-8a3d3ab5d7f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
          ],
        },
        {
          title:
            'BBC发布《重返湖北》纪录片，网友：感觉他努力想黑但实在做不到……',
          id: getId(),
          author: '中国青年网',
          commentsCount: 854,
          publishedAt: 1611541410000,
          type: CardType.MultiPic,
          imgUrls: [
            'https://images.unsplash.com/photo-1557246565-8a3d3ab5d7f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1557246565-8a3d3ab5d7f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1610969766417-85787997631d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
          ],
        },
      ],
    },
  });
}
