import { useQuery } from '@tanstack/react-query';

import type { CategoryData } from '@/types';

import { BASE_URL, fetchWithTokenInstance } from '../instance';

export type CategoryResponseData = CategoryData[];

export const getCategoriesPath = () => `${BASE_URL}/api/categories`;
const categoriesQueryKey = [getCategoriesPath()];

export const getCategories = async () => {
  const response = await fetchWithTokenInstance.get<CategoryResponseData>(getCategoriesPath());
  return response.data;
};

export const useGetCategories = () =>
  useQuery({
    queryKey: categoriesQueryKey,
    queryFn: getCategories,
  });
