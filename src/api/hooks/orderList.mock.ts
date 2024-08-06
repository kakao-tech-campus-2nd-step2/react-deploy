import { rest } from 'msw';

import { BASE_URL } from '../instance';

import type { OrderlistResponse } from '@/types';

export const orderlistMockHandler = [
  rest.get(`${BASE_URL}/api/orders`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(WISHLIST_RESPONSE_DATA));
  }),
];

const WISHLIST_RESPONSE_DATA: OrderlistResponse = {
  content: [
    {
      name: 'Product A',
      price: 100,
      quantity: 2,
      imageUrl:
        'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png',
      orderDateTime: '2024-07-20',
    },
    {
      name: 'Product B',
      price: 10000,
      quantity: 50,
      imageUrl:
        'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png',
      orderDateTime: '2024-07-20',
    },
    {
      name: 'Product C',
      price: 1200,
      quantity: 20,
      imageUrl:
        'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png',
      orderDateTime: '2024-07-21',
    },
  ],
  pageable: {
    sort: {
      sorted: true,
      unsorted: false,
      empty: false,
    },
    pageNumber: 0,
    pageSize: 10,
    offset: 0,
    unpaged: false,
    paged: true,
  },
  totalPages: 5,
  totalElements: 50,
  last: false,
  number: 0,
  size: 10,
  numberOfElements: 2,
  first: true,
  empty: false,
};
