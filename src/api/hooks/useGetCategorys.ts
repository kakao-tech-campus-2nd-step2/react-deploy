import { useQuery } from '@tanstack/react-query';

import type { CategoryData } from '@/types';

import { BASE_URL, fetchInstance } from '../instance';

export type CategoryResponseData = CategoryData[];

export const getCategoriesPath = () => `${BASE_URL}/api/categories`;
const categoriesQueryKey = [getCategoriesPath()];

export const getCategories = async () => {
  const response = await fetchInstance.get<CategoryResponseData>(getCategoriesPath());
  return response.data;
};
console.log('어디로 주소가:', getCategoriesPath);
console.log('기본주소:', BASE_URL);
export const useGetCategories = () =>
  useQuery({
    queryKey: categoriesQueryKey,
    queryFn: getCategories,
  });
