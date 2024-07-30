import { useQuery } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '@/api/instance';

import type { CategoryResponseData } from './type';

export const getCategoriesPath = () => `${BASE_URL}/api/categories`;

const categoriesQueryKey = [getCategoriesPath()];

export const getCategories = async () => {
  const response = await fetchInstance.get<CategoryResponseData>(getCategoriesPath());
  return response.data;
};

export const useGetCategories = () =>
  useQuery({
    queryKey: categoriesQueryKey,
    queryFn: getCategories,
  });
