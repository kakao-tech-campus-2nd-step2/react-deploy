import { AxiosResponse, AxiosError } from 'axios';
import { GetWishesRequest } from '@internalTypes/requestTypes';
import { GetWishesResponse } from '@internalTypes/responseTypes';
import { WISH_PATHS } from '@apis/path';
import { initInstance } from '@apis/instance';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useAPI } from '@/context/api/useAPI';

const getWishes = async (params: GetWishesRequest, baseURL: string): Promise<GetWishesResponse> => {
  const instance = initInstance(baseURL);
  const res: AxiosResponse<GetWishesResponse> = await instance.get(WISH_PATHS.GET_WISH(params), {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
  return res.data;
};

export default getWishes;

export const useGetWishes = (params: GetWishesRequest): UseQueryResult<GetWishesResponse, AxiosError> => {
  const { baseURL } = useAPI();
  return useQuery<GetWishesResponse, AxiosError>({
    queryKey: ['wishes', params],
    queryFn: () => getWishes(params, baseURL),
  });
};
