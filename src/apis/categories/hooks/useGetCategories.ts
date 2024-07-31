import axiosInstance from '@apis/instance';
import { AxiosError } from 'axios';
import { CategoriesResponse } from '@internalTypes/responseTypes';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { CATEGORIES_PATHS } from '@apis/path';

const getCategories = async (): Promise<CategoriesResponse> => {
  const res = await axiosInstance.get<CategoriesResponse>(CATEGORIES_PATHS.CATEGORIES);
  return res.data;
};

export const useGetCategories = (): UseQueryResult<CategoriesResponse, AxiosError> =>
  useQuery<CategoriesResponse, AxiosError>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
