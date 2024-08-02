import { useSuspenseQuery } from '@tanstack/react-query';

import { useAPIBaseURL } from '@/provider/APIBaseURL';
import type { ProductData } from '@/types';

import { fetchInstance } from '../instance';

export type ProductDetailRequestParams = {
  productId: string;
};

type Props = ProductDetailRequestParams;

export type GoodsDetailResponseData = ProductData;

export const getProductDetailPath = (productId: string, baseURL?: string) => `${baseURL ?? ''}/api/products/${productId}`;

const getProductDetail = async (params: ProductDetailRequestParams, baseURL: string) => {
  const response = await fetchInstance(baseURL).get<GoodsDetailResponseData>(
    getProductDetailPath(params.productId),
  );

  return response.data;
};

export const useGetProductDetail = ({ productId }: Props) => {
  const baseURL = useAPIBaseURL()[0];

  return useSuspenseQuery({
    queryKey: [getProductDetailPath(productId), baseURL],
    queryFn: () => getProductDetail({ productId }, baseURL),
  });
};
