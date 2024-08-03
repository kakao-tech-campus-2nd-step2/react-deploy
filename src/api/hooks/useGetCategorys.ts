import type { QueryKey} from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { CategoryData } from '@/types';

import { BASE_URL, fetchInstance } from '../instance';

export type CategoryResponseData = CategoryData[];

export const getCategoriesPath = () => `${BASE_URL}/api/categories`;
const getCategoriesQueryKey = (baseUrl: string): QueryKey => ['categories', baseUrl];

export const getCategories = async () => {
  const response = await fetchInstance.get<CategoryResponseData>(getCategoriesPath());
  return response.data;
};

export const useGetCategories = () =>
  useQuery({
    queryKey: getCategoriesQueryKey(BASE_URL),
    queryFn: getCategories,
  });
