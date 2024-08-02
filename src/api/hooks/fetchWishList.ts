import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { authSessionStorage } from '@/utils/storage';

import { fetchInstance } from '../instance';

const QUERY_KEY_WISHLIST = 'wishList';

export interface WishItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface WishListResponse {
  content: WishItem[];
  page: {
    totalPages: number;
    totalElements: number;
  };
}

const fetchWishList = async (page: number, size: number): Promise<WishListResponse> => {
  const token = authSessionStorage.get();
  if (!token) throw new Error('토큰이 없습니다.');

  const response = await fetchInstance.get('/api/wishes', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
      size,
      sort: 'id,desc',
    },
  });

  return response.data;
};

export const useWishList = (
  page: number = 0,
  size: number = 10,
  options?: UseQueryOptions<WishListResponse, Error>,
) => {
  return useQuery<WishListResponse, Error>({
    queryKey: [QUERY_KEY_WISHLIST, page, size],
    queryFn: () => fetchWishList(page, size),
    ...options,
  });
};

export const useRemoveWish = (options?: UseMutationOptions<void, Error, number>) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (wishId: number) => {
      const token = authSessionStorage.get();
      if (!token) throw new Error('토큰이 없습니다.');

      await fetchInstance.delete('/api/wishes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { id: wishId },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_WISHLIST] });
    },
    ...options,
  });
};

export const useAddWish = (options?: UseMutationOptions<void, Error, number>) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (productId: number) => {
      const token = authSessionStorage.get();
      if (!token) throw new Error('토큰이 없습니다.');

      await fetchInstance.post(
        `/api/wishes`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_WISHLIST] });
    },
    ...options,
  });
};
