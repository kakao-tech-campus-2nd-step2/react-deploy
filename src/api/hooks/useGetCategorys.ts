import { useQuery } from '@tanstack/react-query';

import type { CategoryData } from '@/types';

import { BASE_URL, fetchInstance } from '../instance';

export type CategoryResponseData = {
  contents: CategoryData[];
};

export const getCategoriesPath = () => `${BASE_URL}/api/categories`;
const categoriesQueryKey = [getCategoriesPath()];

export const getCategories = async () => {
  const response = await fetchInstance.get<CategoryResponseData>(getCategoriesPath(), {
    params: {
      page: 0,
      size: 10,
      sort: 'id,asc',
    },
  });

  if (response.status === 200) {
    return response.data.contents;
  } else {
    console.error(`Error fetching categories: ${response.statusText}`);
    return [];
  }
};

console.log('어디로 주소가:', getCategoriesPath);
console.log('기본주소:', BASE_URL);

export const useGetCategories = () =>
  useQuery({
    queryKey: categoriesQueryKey,
    queryFn: getCategories,
  });
