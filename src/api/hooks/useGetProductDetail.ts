import { useSuspenseQuery } from '@tanstack/react-query';

import type { ProductData } from '@/types';

import { BASE_URL, fetchInstance } from '../instance';

export type ProductDetailRequestParams = {
  product_id: string;
};

type Props = ProductDetailRequestParams;

export type GoodsDetailResponseData = ProductData;

export const getProductDetailPath = (productId: string) => `${BASE_URL}/api/products/${productId}`;

export const getProductDetail = async (params: ProductDetailRequestParams) => {
  const response = await fetchInstance.get<GoodsDetailResponseData>(
    getProductDetailPath(params.product_id),
  );

  return response.data;
};

export const useGetProductDetail = ({ product_id }: Props) => {
  return useSuspenseQuery({
    queryKey: [getProductDetailPath(product_id)],
    queryFn: () => getProductDetail({ product_id }),
  });
};
