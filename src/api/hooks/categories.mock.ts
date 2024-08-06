import { rest } from 'msw';

import { getCategoriesPath } from './useGetCategorys';

export const categoriesMockHandler = [
  rest.get(getCategoriesPath(), (_, res, ctx) => {
    return res(ctx.json(CATEGORIES_RESPONSE_DATA));
  }),
];

const CATEGORIES_RESPONSE_DATA = [
  {
    categoryId: 2920,
    label: '생일',
    title: '감동을 높여줄 생일 선물 리스트',
    backgroundColor: '#5949a3',
    imageUrl:
      'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png',
  },
  {
    categoryId: 2930,
    label: '교환권',
    title: '놓치면 후회할 교환권 특가',
    backgroundColor: '#9290C3',
    imageUrl:
      'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fproduct%2Fgift%2Fproduct%2F20240131153049_5a22b137a8d346e9beb020a7a7f4254a.jpg',
  },
];
