import { useSuspenseQuery } from '@tanstack/react-query';

import { useBackend } from '@/provider/Auth/Backend'; // useBackend 훅 사용
import type { ProductOptionsData } from '@/types';

import { fetchInstance } from '../instance';
import type { ProductDetailRequestParams } from './useGetProductDetail';

type Props = ProductDetailRequestParams;

export type ProductOptionsResponseData = ProductOptionsData[];

export const getProductOptionsPath = (productId: string) => `/api/products/${productId}/options`;

export const getProductOptions = async (params: ProductDetailRequestParams, baseURL: string) => {
  const response = await fetchInstance(baseURL).get<ProductOptionsResponseData>(
    getProductOptionsPath(params.productId),
  );
  return response.data;
};

export const useGetProductOptions = ({ productId }: Props) => {
  const { backendUrl } = useBackend(); // useBackend 훅 사용

  return useSuspenseQuery({
    queryKey: [getProductOptionsPath(productId)],
    queryFn: () => getProductOptions({ productId }, backendUrl),
  });
};
