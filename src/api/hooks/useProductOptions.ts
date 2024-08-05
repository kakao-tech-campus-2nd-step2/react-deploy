import { useSuspenseQuery } from '@tanstack/react-query';

import { fetchProductOptions } from '@/api/services/productOptions';

export const useProductOptions = (productId: number) => {
  return useSuspenseQuery({
    queryKey: ['product', 'options', productId],
    queryFn: () => fetchProductOptions({ productId }),
  });
};
