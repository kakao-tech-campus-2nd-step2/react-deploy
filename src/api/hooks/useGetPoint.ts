import { useQuery } from '@tanstack/react-query';

import { APIPath } from '../apiPath';
import { BASE_URL, fetchInstanceWithAuth } from '../instance';

export type PointResponse = {
  point: number;
};

export const getPointPath = () => `${BASE_URL}${APIPath.getPoint}`;
export const getPoint = async () => {
  const token = localStorage.getItem('token') ?? '';
  const response = await fetchInstanceWithAuth(token).get<PointResponse>(getPointPath());
  return response.data;
};

export const useGetPoint = () => {
  return useQuery({
    queryKey: [getPointPath()],
    queryFn: getPoint,
  });
};
