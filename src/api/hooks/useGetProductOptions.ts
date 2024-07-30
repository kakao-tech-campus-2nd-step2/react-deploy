import { useSuspenseQuery } from '@tanstack/react-query';

import { getProductOptions } from '@/api/utils';
import { BASE_URL } from '@/api/instance';
import { ProductDetailRequestParams } from '@/api/types';

export const getProductOptionsPath = (productId: string) =>
  `${BASE_URL}/api/products/${productId}/options`;

export const useGetProductOptions = ({ productId }: ProductDetailRequestParams) =>
  useSuspenseQuery({
    queryKey: [getProductOptionsPath(productId)],
    queryFn: () => getProductOptions({ productId }),
  });
