import { useQuery } from '@tanstack/react-query';

import { getInstance } from '@/api/instance';
import type { CategoryData } from '@/types';

export type CategoryResponseData = CategoryData[];

export const getCategoriesPath = () => `/api/category`;
const categoriesQueryKey = [getCategoriesPath()];

export const getCategories = async () => {
  const response = await getInstance().get<CategoryResponseData>(getCategoriesPath());
  return response.data;
};

export const useGetCategories = () =>
  useQuery({
    queryKey: categoriesQueryKey,
    queryFn: getCategories,
  });
