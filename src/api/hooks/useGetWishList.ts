import { useQuery } from '@tanstack/react-query';

import { ApiPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

import { fetchInstance } from '../instance';

export interface WishListItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}

interface GetWishListResponse {
  content: WishListItem[];
  totalElements: number;
  last: boolean;
  number: number;
  size: number;
}

export const getWishList = async (page: number, size: number): Promise<GetWishListResponse> => {
  const response = await fetchInstance.get<GetWishListResponse>(ApiPath.wishes.root, {
    params: {
      page,
      size,
      sort: 'createdDate,desc',
    },
    headers: {
      Authorization: `Bearer ${authSessionStorage.get()}`,
    },
  });
  return response.data;
};

export const useGetWishList = (page: number, size: number) => {
  return useQuery({
    queryKey: ['wishList', page, size],
    queryFn: () => getWishList(page, size),
  });
};
