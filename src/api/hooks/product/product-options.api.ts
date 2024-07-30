import { useSuspenseQuery } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '@/api/instance';

import type {
  ProductDetailProps,
  ProductDetailRequestParams,
  ProductOptionsResponseData,
} from './type';

export const getProductOptionsPath = (productId: string) =>
  `${BASE_URL}/api/products/${productId}/options`;

export const getProductOptions = async (params: ProductDetailRequestParams) => {
  const response = await fetchInstance.get<ProductOptionsResponseData>(
    getProductOptionsPath(params.productId),
  );
  return response.data;
};

export const useGetProductOptions = ({ productId }: ProductDetailProps) => {
  return useSuspenseQuery({
    queryKey: [getProductOptionsPath(productId)],
    queryFn: () => getProductOptions({ productId }),
  });
};
