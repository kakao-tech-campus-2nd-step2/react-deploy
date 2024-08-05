import { useQuery } from '@tanstack/react-query';

import type { CategoryData } from '@/types';
import { authSessionStorage } from '@/utils/storage';

import { BASE_URL, fetchInstance } from '../instance';

export type CategoryResponseData = {
  contents: CategoryData[];
}; 

export const getCategoriesPath = () => `${BASE_URL}/api/categories`;

const categoriesQueryKey = [getCategoriesPath()];

export const getCategories = async () => {
  try {
    const response = await fetchInstance.get<CategoryResponseData>(getCategoriesPath(), {
      headers: {
        'Authorization': `Bearer ${authSessionStorage.get()?.token}`,
      },
      params: {
        page: 0,
        size: 10,
        sort: 'id,asc',
      },
    });
    
    if (response.status === 200) {
      console.log('Category Fetching 에 성공하였습니다!', response.data.contents);
      return response.data.contents;
    } 
    else {
      console.error('Unexpected response structure:', response);
    }
  }
  catch (error) {
    console.error(error);
  }
};

export const useGetCategories = () =>
  useQuery({
    queryKey: categoriesQueryKey,
    queryFn: getCategories,
  });
