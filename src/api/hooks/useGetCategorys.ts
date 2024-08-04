import { useQuery } from '@tanstack/react-query';

import type { CategoryData } from '@/types';

import { BASE_URL, fetchInstance } from '../instance';

export type CategoryResponseData =
  CategoryData[];


export const getCategoriesPath = () => `${BASE_URL}/api/categories`;

const categoriesQueryKey = [getCategoriesPath()];

export const getCategories = async () => {
  try {
    const response = await fetchInstance.get<CategoryResponseData>(getCategoriesPath());
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const useGetCategories = () =>
  useQuery({
    queryKey: categoriesQueryKey,
    queryFn: getCategories,
  });
