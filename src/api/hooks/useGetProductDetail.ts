import { useSuspenseQuery } from '@tanstack/react-query';

import { getInstance } from '@/api/instance';
import type { ProductData } from '@/types';

export type ProductDetailRequestParams = {
  productId: string;
};

type Props = ProductDetailRequestParams;

export type GoodsDetailResponseData = ProductData;

export const getProductDetailPath = (productId: string) => `/api/products/${productId}`;

export const getProductDetail = async (params: ProductDetailRequestParams) => {
  const response = await getInstance().get<GoodsDetailResponseData>(
    getProductDetailPath(params.productId),
  );

  return response.data;
};

export const useGetProductDetail = ({ productId }: Props) => {
  return useSuspenseQuery({
    queryKey: [getProductDetailPath(productId)],
    queryFn: () => getProductDetail({ productId }),
  });
};
