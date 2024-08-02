import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useAPI } from '@context/api/useAPI';
import { GetPointResponse } from '@internalTypes/responseTypes';
import { AxiosError } from 'axios';
import { initInstance } from '@apis/instance';
import { POINT_PATHS } from '@apis/path';

const getPoint = async (baseURL: string): Promise<GetPointResponse> => {
  const instance = initInstance(baseURL);
  const res = await instance(POINT_PATHS.GET_POINT, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
  return res.data;
};

export const useGetPoint = (): UseQueryResult<GetPointResponse, AxiosError> => {
  const { baseURL } = useAPI();
  return useQuery<GetPointResponse, AxiosError>({
    queryKey: ['point'],
    queryFn: () => getPoint(baseURL),
  });
};
