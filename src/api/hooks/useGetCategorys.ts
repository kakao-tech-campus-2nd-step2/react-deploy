import { useQuery } from '@tanstack/react-query';

import { getCategories } from '@/api/utils';
import { BASE_URL } from '@/api/instance';

export const getCategoriesPath = () => `${BASE_URL}/api/categories`;

export const useGetCategories = () => {
  const categoriesQueryKey = [getCategoriesPath()];

  return useQuery({
    queryKey: categoriesQueryKey,
    queryFn: getCategories,
  });
};
