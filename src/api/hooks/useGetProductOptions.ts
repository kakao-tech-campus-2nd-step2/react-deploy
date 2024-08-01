import { useSuspenseQuery } from '@tanstack/react-query';

import { useAPIBaseURL } from '@/provider/APIBaseURL';
import type { ProductOptionsData } from '@/types';

import { fetchInstance } from '../instance';
import type { ProductDetailRequestParams } from './useGetProductDetail';

type Props = ProductDetailRequestParams;

export type ProductOptionsResponseData = ProductOptionsData[];

export const getProductOptionsPath = (productId: string, baseURL?: string) =>
  `${baseURL ?? ''}/api/products/${productId}/options`;

const getProductOptions = async (params: ProductDetailRequestParams, baseURL: string) => {
  const response = await fetchInstance(baseURL).get<ProductOptionsResponseData>(
    getProductOptionsPath(params.productId),
  );
  return response.data;
};

export const useGetProductOptions = ({ productId }: Props) => {
  const baseURL = useAPIBaseURL()[0];
  return useSuspenseQuery({
    queryKey: [getProductOptionsPath(productId), baseURL],
    queryFn: () => getProductOptions({ productId }, baseURL),
  });
};
