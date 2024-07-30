import { useQuery } from '@tanstack/react-query';

import { BASE_URL } from '@/api/instance';
import { getCategories } from '@/api/utils';

export const getCategoriesPath = () => `${BASE_URL}/api/categories`;

export const useGetCategories = () => {
  const categoriesQueryKey = [getCategoriesPath()];

  return useQuery({
    queryKey: categoriesQueryKey,
    queryFn: getCategories,
  });
};
