import { delay } from '@sjtu-fe/utility';
import { CardType } from '@src/ui/Card/type';
import {
  ArticleDetailEntity,
  BaseResponse,
  CardListResponse,
  StatusCode,
} from './types';

let uid = 0;

function getId() {
  return `0x${(uid++).toString(16)}`;
}

export async function queryCardList(): Promise<BaseResponse<CardListResponse>> {
  return Promise.resolve<BaseResponse<CardListResponse>>({
    status: StatusCode.Success,
    data: {
      cursor: '666',
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
        {
          title: '11年前那位感动中国的“春运母亲”，找到了',
          id: getId(),
          author: '新华社',
          commentsCount: 438,
          publishedAt: 1612240603000,
          type: CardType.Video,
          imgUrls: [
            'http://p3.toutiaoimg.com/img/pgc-image/caf6d83c155a4eb5bbc5fe195d47f15d~tplv-tt-cs0:640:360.jpg',
          ],
        },
      ],
    },
  });
}

export async function getArticleDetailById(
  id: string
): Promise<BaseResponse<ArticleDetailEntity>> {
  await delay(100);
  return {
    status: StatusCode.Success,
    data: {
      id,
      title: '11年前那位感动中国的“春运母亲”，找到了',
      author: {
        name: '新华社',
        avatarUrl:
          'https://sf3-ttcdn-tos.pstatp.com/img/pgc-image/21507a12df2c4e7eb2d859c6f32dd497~300x300.image',
        remark: '新华社官方账号',
        fav: false,
      },
      comments: [],
      contentNode: {
        type: 'article',
        children: [
          {
            type: 'p',
            children:
              '2010年1月30日，新华社记者周科在南昌火车站拍下了这样一张照片：年轻母亲被巨大的行囊压弯了身躯，她手里的背包眼看拖地，但揽在右臂中的婴孩整洁而温暖',
          },
          {
            type: 'p',
            children:
              '11年来，在网民和关注者不断发来的相关信息里，周科开始了一场漫长的寻找。最近，周科终于与11年前自己镜头里的年轻母亲见面了。',
          },
          {
            type: 'video',
            attributes: {
              source: [
                {
                  src:
                    'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
                  type: 'video/mp4',
                },
              ],
              coverUrl:
                'http://p9.pstatp.com/large/tos-cn-o-0004/bed2d9252d9a4509b9e487214a297b5c',
            },
          },
          {
            type: 'p',
            children: '这是一次11年的寻找。',
          },
          {
            type: 'p',
            children:
              '2010年1月30日，当天全国进入春运的第一天。新华社记者周科在南昌火车站广场拍下了这样一张照片：',
          },
          {
            type: 'p',
            children:
              '一位年轻的母亲，背上巨大的行囊压弯了她的身躯，手里的背包眼看拖地，但揽在右臂中的婴孩整洁而温暖。抬头前行的年轻母亲面色红润，一双大眼睛坚定有力。',
          },
          {
            type: 'img',
            attributes: {
              src:
                'https://p3.pstatp.com/large/pgc-image/caf6d83c155a4eb5bbc5fe195d47f15d',
              alt: '11年前那位感动中国的“春运母亲”，找到了',
            },
          },
          {
            type: 'p',
            children:
              '↑2010年1月30日，巴木玉布木背着大包、抱着孩子在南昌火车站匆忙赶车。周科摄',
          },
          {
            type: 'p',
            children:
              '就是在那一天，这张名为《孩子，妈妈带你回家》的照片被新华社摄影部的编辑含泪编发，在当晚海量春运照片中直击人心，被数百家网站和报纸选用。',
          },
          {
            type: 'p',
            children:
              '2011年，该照片获得年度中国新闻摄影金奖和第21届中国新闻奖。',
          },
          {
            type: 'p',
            children: '“一张震撼人心却又让人深思的照片！”',
          },
          {
            type: 'p',
            children: '“肩上扛的是生活，怀里搂的是希望。”',
          },
          {
            type: 'p',
            children: '“当妈之后就看不得这类图了，看了就忍不住眼泪。”',
          },
          {
            type: 'p',
            children:
              '11年来，众多的询问和反馈，让记者开始后悔当年“没有留下那位母亲的联系方式”。在众多网民和关注者不断发来的相关信息里，也让周科开始了一场漫长的寻找。',
          },
          {
            type: 'p',
            children:
              '随着信息一点点地拼凑，照片一张张地对比，不久前，当年那位母亲，轮廓越来越清晰：巴木玉布木，32岁，彝族人。',
          },
          {
            type: 'p',
            children:
              '2021年春节前夕，在四川省凉山彝族自治州越西县瓦岩乡桃园村，围坐在火塘旁，伴随着跳动的火苗，周科终于结束了寻找，与11年前那名自己镜头里的年轻母亲相遇了。',
          },
          {
            type: 'img',
            attributes: {
              src:
                'https://p3.pstatp.com/large/pgc-image/a7afab1df92f436f9ea060279437e548',
              alt: '11年前那位感动中国的“春运母亲”，找到了',
            },
          },
          {
            type: 'p',
            children:
              '“一次喧闹车站的陌生偶遇，到远隔数千里之外的重逢，苦苦寻找了11年的一名没有只言片语的陌生人啊。”周科感慨，这些年自己带着相机走过更多的陌生城市，然而，这名曾在自己镜头里出现的陌生人却成了11年的牵挂。',
          },
        ],
      },
    },
  };
}
