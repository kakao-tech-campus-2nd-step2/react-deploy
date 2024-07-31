import { useSuspenseQuery } from '@tanstack/react-query';

import { fetchProductDetail } from '@/api/services/productDetail';

export const useProductDetail = (productId: number) => {
  return useSuspenseQuery({
    queryKey: ['product', 'detail', productId],
    queryFn: () => fetchProductDetail({ productId }),
  });
};
