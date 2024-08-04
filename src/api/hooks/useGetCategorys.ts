import { useQuery } from '@tanstack/react-query';

import type { CategoryData } from '@/types';

import { BASE_URL, fetchInstance } from '../instance';

export type CategoryResponseData = CategoryData[];

export const getCategoriesPath = () => `${BASE_URL}/api/categories`;
const categoriesQueryKey = [getCategoriesPath()];

export const getCategories = async (): Promise<CategoryResponseData> => {
  const response = await fetchInstance.get<CategoryResponseData>(getCategoriesPath());
  return response.data;
};

export const useGetCategories = () =>
  useQuery<CategoryResponseData, Error>({
    queryKey: categoriesQueryKey,
    queryFn: getCategories,
  });
