import { useQuery } from '@tanstack/react-query';

import type { CategoryData } from '@/types';

import { fetchInstance } from '../instance';

export type CategoryResponseData = CategoryData[];

export const getCategoriesPath = () => `/api/categories`;

const categoriesQueryKey = [getCategoriesPath()];

const getCategories = async () => {
  try {
    const response = await fetchInstance.get<CategoryResponseData>(getCategoriesPath());

    // console.log('Response data:', response.data);

    return response.data;
  } catch (error) {
    console.log('Error fetching categories:', error);
    throw error;
  }
};

export const useGetCategories = () =>
  useQuery({
    queryKey: categoriesQueryKey,
    queryFn: getCategories,
  });
