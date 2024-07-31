import { BACKEND_API } from '@/api/config';
import { API_ERROR_MESSAGES } from '@/constants/errorMessage';
import { ProductData } from '@/types/productType';

type ProductDetailRequestParams = {
  productId: number;
};

export type ProductDetailResponse = ProductData;

export const fetchProductDetail = async ({
  productId,
}: ProductDetailRequestParams) => {
  try {
    const response = await BACKEND_API.get<ProductDetailResponse>(
      `/api/products/${productId}`
    );

    return response.data;
  } catch (error) {
    throw new Error(API_ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};
