import { rest } from 'msw';
import type { WishRequestData, WishResponseData } from '@/api/hooks/useAddWishList';
import { postAddWishListPath } from '@/api/hooks/useAddWishList';

export const wishId = 123;

export const AddWishListMockHandler = [
  rest.post(postAddWishListPath(wishId), (req, res, ctx) => {
    const { productId } = req.body as WishRequestData;

    if (!productId) {
      // productId가 없는 경우 400 에러 반환
      return res(
        ctx.status(400),
        ctx.json({
          error: 'Bad Request',
          message: 'Product ID is required',
        }),
      );
    }

    // 가짜 응답 데이터
    const mockResponse: WishResponseData = {
      id: 1,
      productId,
    };

    return res(ctx.status(200), ctx.json(mockResponse));
  }),
];
