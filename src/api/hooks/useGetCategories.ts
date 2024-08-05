import { useQuery } from '@tanstack/react-query';

import { ApiPath } from '@/routes/path';
import type { CategoryData } from '@/types';

import { fetchInstance } from '../instance';

export type CategoryResponseData = CategoryData[];

export const getCategories = async () => {
  const response = await fetchInstance.get<CategoryResponseData>(ApiPath.categories);
  console.log(response);
  return response.data;
};

export const useGetCategories = () =>
  useQuery({
    queryKey: [ApiPath.categories],
    queryFn: getCategories,
  });
