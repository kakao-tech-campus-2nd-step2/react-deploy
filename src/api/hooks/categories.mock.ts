import { rest } from 'msw';

import { getCategoriesPath } from './useGetCategorys';

export const categoriesMockHandler = [
  rest.get(getCategoriesPath(), (_, res, ctx) => {
    return res(ctx.json(CATEGORIES_RESPONSE_DATA));
  }),
];

const CATEGORIES_RESPONSE_DATA = [
  {
    id: 2920,
    name: '생일',
    description: '감동을 높여줄 생일 선물 리스트',
    color: '#5949a3',
    imageUrl:
      'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png',
  },
  {
    id: 2930,
    name: '교환권',
    description: '놓치면 후회할 교환권 특가',
    color: '#9290C3',
    imageUrl:
      'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fproduct%2Fgift%2Fproduct%2F20240131153049_5a22b137a8d346e9beb020a7a7f4254a.jpg',
  },
  {
    id: 3302,
    name: '건강/비타민',
    imageUrl:
      'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fproduct%2Fgift%2Fproduct%2F20230907164349_6605944da7c24d82b9c6ed60fcb75283.jpg',
    title: '건강을 기원하는 마음 담아 선물하세요❤️',
    description: '홍삼 / 녹용 / 비타민 / 콜라겐 / 오메가3 / 건강즙 등',
    color: '#fc8197',
  },
  {
    id: 3301,
    name: '과일/한우',
    imageUrl:
      'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fproduct%2Fgift%2Fproduct%2F20240213090444_1b3dc970aec54eabbf3fbb7d35c0b7af.jpg',
    title: '정성 가득한 과일/한우 선물로 감사한 마음을 전해보세요❤️',
    description: '과일, 한우, 수입소고기, 돼지고기, 전복, 견과 등',
    color: '#ed6d59',
  },
  {
    id: 2926,
    name: '출산/키즈',
    imageUrl:
      'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292620240221_MLFJR.jpeg',
    title: '벅찬 감동의 마음을 전할',
    description: '엄마와 아이를 위한 세심한 선물👼🏻',
    color: '#fc8197',
  },
];
