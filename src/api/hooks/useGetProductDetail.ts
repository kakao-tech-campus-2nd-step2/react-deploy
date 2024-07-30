import { useSuspenseQuery } from '@tanstack/react-query';

import { BASE_URL } from '@/api/instance';
import type { ProductDetailRequestParams } from '@/api/types';
import { getProductDetail } from '@/api/utils';

export const getProductDetailPath = (productId: string) => `${BASE_URL}/api/products/${productId}`;

export const useGetProductDetail = ({ productId }: ProductDetailRequestParams) =>
  useSuspenseQuery({
    queryKey: [getProductDetailPath(productId)],
    queryFn: () => getProductDetail({ productId }),
  });
