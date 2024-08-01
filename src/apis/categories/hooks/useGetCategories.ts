import initInstance from '@apis/instance';
import { AxiosError } from 'axios';
import { CategoriesResponse } from '@internalTypes/responseTypes';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { CATEGORIES_PATHS } from '@apis/path';

const categoriesInstance = initInstance(process.env.REACT_APP_EUN_KYOUNG_BASE_URL);

const getCategories = async (): Promise<CategoriesResponse> => {
  const res = await categoriesInstance.get<CategoriesResponse>(CATEGORIES_PATHS.CATEGORIES);
  return res.data;
};

export const useGetCategories = (): UseQueryResult<CategoriesResponse, AxiosError> =>
  useQuery<CategoriesResponse, AxiosError>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
