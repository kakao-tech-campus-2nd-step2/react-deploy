import { initInstance } from '@apis/instance';
import { AxiosError } from 'axios';
import { CategoriesResponse } from '@internalTypes/responseTypes';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { CATEGORIES_PATHS } from '@apis/path';
import { useAPI } from '@context/api/useAPI';

const getCategories = async (baseURL: string): Promise<CategoriesResponse> => {
  const instance = initInstance(baseURL);
  const res = await instance.get<CategoriesResponse>(CATEGORIES_PATHS.CATEGORIES);
  return res.data;
};

export const useGetCategories = (): UseQueryResult<CategoriesResponse, AxiosError> => {
  const { baseURL } = useAPI();

  return useQuery<CategoriesResponse, AxiosError>({
    queryKey: ['categories'],
    queryFn: () => getCategories(baseURL),
  });
};
