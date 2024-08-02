import { useSuspenseQuery } from '@tanstack/react-query';

import type { ProductData } from '@/types';

import { BASE_URL, fetchInstance } from '../instance';

export type ProductDetailRequestParams = {
  productId: string;
};

type Props = ProductDetailRequestParams;

export type GoodsDetailResponseData = ProductData;

export const getProductDetailPath = (productId: string) => `${BASE_URL}/api/products/${productId}`;

export const getProductDetail = async (params: ProductDetailRequestParams) => {
  try {
    const response = await fetchInstance.get<GoodsDetailResponseData>(
      getProductDetailPath(params.productId),
    );

    // console.log('Response data:', response.data);
    return response.data;
  } catch (error) {
    console.log('error fetching product detail: ', error);
    throw error;
  }
};

export const useGetProductDetail = ({ productId }: Props) => {
  return useSuspenseQuery({
    queryKey: [getProductDetailPath(productId)],
    queryFn: () => getProductDetail({ productId }),
  });
};
