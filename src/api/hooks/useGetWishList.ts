import { useQuery } from '@tanstack/react-query';

import { BASE_URL, fetchAuthInstance } from '../instance';

type Params = {
  page: number;
  size: number;
  sort: string;
};
export const getWishListPath = `${BASE_URL}/api/wishes`;

export const getWishList = async (params?: Params) => {
  const response = await fetchAuthInstance.get(getWishListPath, {
    params: params,
  });
  return response.data;
};

export const useGetWishList = (params?: Params) => {
  return useQuery({
    queryKey: ['wishes'],
    queryFn: () => getWishList(params),
    select: (response) => response.content,
  });
};
