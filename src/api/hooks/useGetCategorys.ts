import { useQuery } from '@tanstack/react-query';

import type { CategoryData } from '@/types';

import { BASE_URL, fetchInstance } from '../instance';

export type CategoryResponseData = CategoryData[];

export const getCategoriesPath = () => `${BASE_URL}/api/categories`;
const categoriesQueryKey = [getCategoriesPath()];

<<<<<<< HEAD
export const getCategories = async (): Promise<CategoryResponseData> => {
=======
export const getCategories = async () => {
>>>>>>> upstream/hehelee
  const response = await fetchInstance.get<CategoryResponseData>(getCategoriesPath());
  return response.data;
};

export const useGetCategories = () =>
<<<<<<< HEAD
  useQuery<CategoryResponseData, Error>({
=======
  useQuery({
>>>>>>> upstream/hehelee
    queryKey: categoriesQueryKey,
    queryFn: getCategories,
  });
