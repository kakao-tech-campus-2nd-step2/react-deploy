import { useSuspenseQuery } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '@/api/instance';

import type { GoodsDetailResponseData, ProductDetailRequestParams } from './type';

export const getProductDetailPath = (productId: string) => `${BASE_URL}/api/products/${productId}`;

export const getProductDetail = async (params: ProductDetailRequestParams) => {
  const response = await fetchInstance.get<GoodsDetailResponseData>(
    getProductDetailPath(params.productId),
  );

  return response.data;
};

export const useGetProductDetail = ({ productId }: ProductDetailRequestParams) => {
  return useSuspenseQuery({
    queryKey: [getProductDetailPath(productId)],
    queryFn: () => getProductDetail({ productId }),
  });
};
