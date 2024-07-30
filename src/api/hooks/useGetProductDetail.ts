import { useSuspenseQuery } from '@tanstack/react-query';

import { getProductDetail } from '@/api/utils';
import { BASE_URL } from '@/api/instance';
import { ProductDetailRequestParams } from '@/api/types';

export const getProductDetailPath = (productId: string) => `${BASE_URL}/api/products/${productId}`;

export const useGetProductDetail = ({ productId }: ProductDetailRequestParams) =>
  useSuspenseQuery({
    queryKey: [getProductDetailPath(productId)],
    queryFn: () => getProductDetail({ productId }),
  });
