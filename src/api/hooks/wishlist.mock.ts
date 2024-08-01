import { rest } from 'msw';

import type { WishesResponseRawData } from './useGetWishes';
import { getWishesPath } from './useGetWishes';

const WISHLIST_MOCK_DATA: WishesResponseRawData = {
  data: {
    total_page: 5,
    content: [
      {
        id: 1,
        product_id: 1,
        product_name: 'Product A',
        product_price: 2000,
        image_url:
          'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png',
      },
      {
        id: 2,
        product_id: 2,
        product_name: 'Product B',
        product_price: 3000,
        image_url:
          'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png',
      },
    ],
  },
};

export const wishlistMockHandler = [
  rest.get(getWishesPath({ page: 0 }), (_, res, ctx) => {
    // Mocking the API to return the mock data
    return res(ctx.json(WISHLIST_MOCK_DATA));
  }),
];
