import { useSuspenseQuery } from '@tanstack/react-query';

import { BASE_URL, fetchWithTokenInstance } from '../instance';

export type GoodsDetailResponseData = {
  point: number;
};

export const getMyPointPath = () => `${BASE_URL}/api/members/me`;

export const getMyPoint = async () => {
  const response = await fetchWithTokenInstance.get<GoodsDetailResponseData>(getMyPointPath());

  return response.data;
};

export const useGetMyPoint = () => {
  return useSuspenseQuery({
    queryKey: [getMyPointPath()],
    queryFn: () => getMyPoint(),
  });
};
