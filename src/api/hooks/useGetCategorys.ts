import { useQuery } from '@tanstack/react-query';

import { useBackend } from '@/provider/Auth/Backend';
import type { CategoryData } from '@/types';

import { fetchInstance } from '../instance';

export type CategoryResponseData = CategoryData[];

export const getCategoriesPath = () => `/api/categories`;

export const getCategories = async (baseURL: string) => {
  const response = await fetchInstance(baseURL).get(getCategoriesPath());
  const responseData = response.data;

  // 응답 데이터의 구조를 확인하고 필요한 형식으로 변환
  if (Array.isArray(responseData)) {
    return responseData;
  } else if (responseData.categories && Array.isArray(responseData.categories)) {
    return responseData.categories;
  } else {
    throw new Error('Unexpected response format');
  }
};

export const useGetCategories = () => {
  const { backendUrl } = useBackend();

  return useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(backendUrl),
    initialData: [],
  });
};
