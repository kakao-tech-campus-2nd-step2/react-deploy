import { AxiosResponse, AxiosError } from 'axios';
import { GetWishesRequest } from '@internalTypes/requestTypes';
import { GetWishesResponse } from '@internalTypes/responseTypes';
import axiosInstance from '@apis/instance';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { WISH_PATHS } from '@apis/path';

const getWishes = async (params: GetWishesRequest): Promise<GetWishesResponse> => {
  const res: AxiosResponse<GetWishesResponse> = await axiosInstance.get(WISH_PATHS.GET_WISH(params), {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
  return res.data;
};

export default getWishes;

export const useGetWishes = (params: GetWishesRequest): UseQueryResult<GetWishesResponse, AxiosError> =>
  useQuery<GetWishesResponse, AxiosError>({
    queryKey: ['wishes', params],
    queryFn: () => getWishes(params),
  });
