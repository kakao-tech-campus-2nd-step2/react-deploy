import { useQuery } from '@tanstack/react-query';

import { useAPIBaseURL } from '@/provider/APIBaseURL';
import type { CategoryData } from '@/types';

import { fetchInstance } from '../instance';

export type CategoryResponseData = CategoryData[];

export const getCategoriesPath = (baseURL?: string) => `${baseURL ?? ''}/api/categories`;
const categoriesQueryKey = getCategoriesPath();

const getCategories = async (baseURL: string) => {
  const response = await fetchInstance(baseURL).get<CategoryResponseData>(getCategoriesPath());
  return response.data;
};

export const useGetCategories = () => {
  const baseURL = useAPIBaseURL()[0];

  return useQuery({
    queryKey: [ categoriesQueryKey, baseURL ],
    queryFn: () => getCategories(baseURL),
  });
}
