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

export const getWishList = async (
  page?: number,
  size?: number,
  sort?: string,
): Promise<WishListItem[]> => {
  const response = await fetchInstance.get<WishListItem[]>(ApiPath.wishes.root, {
    params: {
      page,
      size,
      sort: sort || 'id,desc',
    },
    headers: {
      Authorization: `Bearer ${authSessionStorage.get()}`,
    },
  });

  console.log(response.data);
  return response.data;
};

export const useGetWishList = (page: number, size: number) => {
  return useQuery({
    queryKey: ['wishList', page, size],
    queryFn: () => getWishList(page, size),
  });
};
