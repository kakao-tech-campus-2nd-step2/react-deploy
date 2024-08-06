import { useQuery } from '@tanstack/react-query';

import { getCurrentBaseURL, getCurrentFetchInstance } from '@/api/instance/index';
import type { CategoryData } from '@/types';

export type CategoryResponseData = CategoryData[];

export const getCategoriesPath = () => `${getCurrentBaseURL()}/api/categories`;
const categoriesQueryKey = [getCategoriesPath()];

export const getCategories = async () => {
  const response = await getCurrentFetchInstance().get<CategoryResponseData>(getCategoriesPath());
  return response.data;
};

export const useGetCategories = () =>
  useQuery({
    queryKey: categoriesQueryKey,
    queryFn: getCategories,
  });
