import { useSuspenseQuery } from '@tanstack/react-query';

import type { ProductDetailRequestParams } from '@/api/hooks/products/useGetProductDetail';
import type { ProductOptionsData } from '@/types';

import { BASE_URL, fetchInstance } from '../../instance';

type Props = ProductDetailRequestParams;

export type ProductOptionsResponseData = ProductOptionsData[];

export const getProductOptionsPath = (productId: string) =>
  `${BASE_URL}/api/products/${productId}/options`;

const getProductOptions = async (params: ProductDetailRequestParams) => {
  try {
    const response = await fetchInstance.get<ProductOptionsResponseData>(
      getProductOptionsPath(params.productId),
    );

    console.log('product options: ', response.data);
    return response.data;
  } catch (error) {
    console.log('error fetching options: ', error);
    throw error;
  }
};

export const useGetProductOptions = ({ productId }: Props) => {
  return useSuspenseQuery({
    queryKey: [getProductOptionsPath(productId)],
    queryFn: () => getProductOptions({ productId }),
  });
};
