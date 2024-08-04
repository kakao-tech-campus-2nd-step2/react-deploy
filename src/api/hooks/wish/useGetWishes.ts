import { useQuery } from '@tanstack/react-query';

import type { WishData } from '@/types';

import { fetchInstance } from '../../instance';

type GetWishRequestData = {
  page: number;
  size: number;
  sort?: string;
};

type GetWishResponseData = WishData[];

export const getWishesPath = ({ page = 0, size, sort }: GetWishRequestData) => {
  const queryParams = new URLSearchParams();

  queryParams.append('page', page.toString());
  queryParams.append('size', size.toString());
  queryParams.append('sort', sort || 'createdDate,desc');

  return `/api/wishes?${queryParams.toString()}`;
};

const getWishes = async (params: GetWishRequestData) => {
  try {
    const response = await fetchInstance.get<GetWishResponseData>(getWishesPath(params));

    // console.log('Response data:', response.data);
    return response.data;
  } catch (error) {
    console.log('Error fetching wish list:', error);
    throw error;
  }
};

export const useGetWishes = (params: GetWishRequestData) =>
  useQuery({
    queryKey: [getWishesPath(params)],
    queryFn: () => getWishes(params),
  });
