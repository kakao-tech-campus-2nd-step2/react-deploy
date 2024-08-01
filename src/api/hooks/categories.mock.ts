import { rest } from 'msw';

import { getCategoriesPath } from './useGetCategorys';

export const categoriesMockHandler = [
  rest.get(getCategoriesPath(), (_, res, ctx) => {
    return res(ctx.json(CATEGORIES_RESPONSE_DATA));
  }),
];

export const CATEGORIES_RESPONSE_DATA = [
  {
    id: 2920,
    key: 'theme_birth',
    name: '생일',
    imageUrl: 'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png',
    title: '감동을 높여줄 생일 선물 리스트',
    description: '예산에 쏙쏙 맞춰 AI가 자동으로 추천드려요!',
    color: '#5949a3',
  },
  {
    id: 3303,
    key: 'graduate_gift',
    name: '졸업선물',
    imageUrl: 'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F20240214_EWQEQ.png',
    title: '졸업을 축하하는 축하 리스트',
    color: '#FEECE2',
  },
  {
    id: 2923,
    key: 'life_small_luxury',
    name: '스몰럭셔리',
    imageUrl: 'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292320231231_EQOWK.png',
    title: '당신을 위한 작은 사치, 스몰 럭셔리 아이템',
    color: '#B67352',
  },
  {
    id: 2925,
    key: 'luxury',
    name: '명품선물',
    imageUrl: 'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fproduct%2Fgift%2Fproduct%2F20220704190149_688ba6f4d3724d5b806554e11ef75880.jpg',
    title: '품격있는 명품 선물 제안',
    description: '소중한 이에게 명품의 품격을 선물하세요',
    color: '#515c7a',
  },
  {
    id: 3142,
    key: 'life_wedding',
    name: '결혼/집들이',
    imageUrl: 'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F314220231231_QTOXR.png',
    title: '들려오는 지인들의 좋은 소식 💌',
    description: '취향저격 감성파 vs 활용만점 실용파',
    color: '#95785d',
  },
  {
    id: 3137,
    key: 'life_tea',
    name: '따뜻한선물',
    imageUrl: 'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F313720231113_LQDZR.png',
    title: '오늘 하루 따뜻하게 보내요',
    description: '쌀쌀할 때 준비하면 좋은 선물🫶🏻',
    color: '#95785d',
  },
  {
    id: 2921,
    key: 'life_small_gift',
    name: '가벼운선물',
    imageUrl: 'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292120240213_MPJIS.png',
    title: '예산은 가볍게, 감동은 무겁게❤️',
    description: '당신의 센스를 뽐내줄 부담 없는 선물',
    color: '#4b4d50',
  },
  {
    id: 3102,
    key: 'life_fan',
    name: '팬심저격',
    imageUrl: 'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F310220240222_UJOFS.jpg',
    title: '최애에 진심인 당신을 위한 팬심저녁 굿즈 모음',
    color: '#333',
  },{
    id: 2930,
    key: 'life_delivery',
    name: '교환권',
    imageUrl: 'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fproduct%2Fgift%2Fproduct%2F20240131153049_5a22b137a8d346e9beb020a7a7f4254a.jpg',
    title: '놓치면 후회할 교환권 특가',
    color: '#9290C3',
  },
  {
    id: 3302,
    key: 'life_health',
    name: '건강/비타민',
    imageUrl: 'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fproduct%2Fgift%2Fproduct%2F20230907164349_6605944da7c24d82b9c6ed60fcb75283.jpg',
    title: '건강을 기원하는 마음 담아 선물하세요❤️',
    description: '홍삼 / 녹용 / 비타민 / 콜라겐 / 오메가3 / 건강즙 등',
    color: '#fc8197',
  },
  {
    id: 3301,
    key: 'life_adult',
    name: '과일/한우',
    imageUrl: 'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fproduct%2Fgift%2Fproduct%2F20240213090444_1b3dc970aec54eabbf3fbb7d35c0b7af.jpg',
    title: '정성 가득한 과일/한우 선물로 감사한 마음을 전해보세요❤️',
    description: '과일, 한우, 수입소고기, 돼지고기, 전복, 견과 등',
    color: '#ed6d59',
  },
  {
    id: 2926,
    key: 'life_pregnancy',
    name: '출산/키즈',
    imageUrl: 'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292620240221_MLFJR.jpeg',
    title: '벅찬 감동의 마음을 전할',
    description: '엄마와 아이를 위한 세심한 선물👼🏻',
    color: '#fc8197',
  },
]