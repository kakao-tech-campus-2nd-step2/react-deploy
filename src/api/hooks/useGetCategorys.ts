import { useQuery } from '@tanstack/react-query';

import type { CategoryData } from '@/types';

import { BASE_URL, fetchInstance } from '../instance';
//import { CATEGORIES_RESPONSE_DATA } from './categories.mock';

export type CategoryResponseData = CategoryData[];

export const getCategoriesPath = () => `${BASE_URL}/api/categories`;
//const categoriesQueryKey = [getCategoriesPath()];

export const getCategories = async () => {
  console.log('Fetching categories from:', getCategoriesPath());
  const response = await fetchInstance.get<CategoryResponseData>(getCategoriesPath());
  console.log('Fetched categories response:', response);
  return response.data;
};

//console.log('어디로 주소가:', getCategoriesPath);
console.log('기본주소:', BASE_URL);

export const useGetCategories = () =>
  useQuery({
    queryKey: ['categories'], // 통신 사용하지 않으므로 단순 문자열 key 사용
    queryFn: getCategories,
  });
