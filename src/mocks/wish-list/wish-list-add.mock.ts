import { rest } from 'msw';

import type { WishResponseData } from '@/api/hooks/wish-list/type';
import { getWishListPath } from '@/api/hooks/wish-list/wish-list-add.api';
import type { WishData } from '@/types/wishlist';

export const AddWishListMockHandler = [
  rest.post(getWishListPath(), (req, res, ctx) => {
    const { productId } = req.body as WishData;

    if (!productId) {
      return res(
        ctx.status(400),
        ctx.json({
          error: 'Bad Request',
          message: 'Product ID is required',
        }),
      );
    }

    const mockResponse: WishResponseData = {
      id: 1,
      productId,
    };

    return res(ctx.status(200), ctx.json(mockResponse));
  }),
];
