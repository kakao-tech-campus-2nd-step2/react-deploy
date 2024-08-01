import { useSuspenseQuery } from '@tanstack/react-query';

import { fetchProductOptions } from '@/api/services/productOptions';

export const useCurrentOptions = (productId: number, optionId: number) => {
  const { data } = useSuspenseQuery({
    queryKey: ['product', 'options', productId],
    queryFn: () => fetchProductOptions({ productId }),
  });

  const optionName = data.find((option) => option.id === optionId)?.name;

  return { optionName };
};
