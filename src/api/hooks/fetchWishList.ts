import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { authSessionStorage } from '@/utils/storage';

import { fetchInstance } from '../instance';

const getToken = () => authSessionStorage.get();

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
  const token = getToken();
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
  options?: UseQueryOptions<WishListResponse, AxiosError>,
) => {
  return useQuery<WishListResponse, AxiosError>({
    queryKey: ['wishList', page, size],
    queryFn: () => fetchWishList(page, size),
    staleTime: 0,
    refetchOnWindowFocus: true,
    ...options,
  });
};

export const useRemoveWish = (
  options?: UseMutationOptions<void, AxiosError, { productId: number }>,
) => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { productId: number }>({
    mutationFn: async ({ productId }) => {
      const token = getToken();
      if (!token) throw new Error('토큰이 없습니다.');
      return fetchInstance.delete(`/api/wishes`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache',
        },
        data: { productId },
      });
    },
    onSuccess: () => {
      console.log('Item successfully removed, invalidating and refetching wishList');
      queryClient.invalidateQueries({ queryKey: ['wishList'] });
      queryClient.refetchQueries({ queryKey: ['wishList'] }); // 쿼리를 강제로 다시 페치합니다
    },
    ...options,
  });
};

export const useAddWish = (
  options?: UseMutationOptions<void, AxiosError, { productId: number }>,
) => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { productId: number }>({
    mutationFn: ({ productId }) => {
      const token = getToken();
      if (!token) throw new Error('토큰이 없습니다.');
      return fetchInstance.post(
        '/api/wishes',
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishList'] });
      queryClient.refetchQueries({ queryKey: ['wishList'] });
    },
    ...options,
  });
};
