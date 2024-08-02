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
    ...options,
  });
};

export const useRemoveWish = (options?: UseMutationOptions<void, AxiosError, number>) => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, number>({
    mutationFn: async (wishId: number) => {
      const token = getToken();
      if (!token) throw new Error('토큰이 없습니다.');
      return fetchInstance.delete(`/api/wishes/${wishId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishList'] });
    },
    ...options,
  });
};

export const useAddWish = (options?: UseMutationOptions<void, AxiosError, number>) => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, number>({
    mutationFn: (productId: number) => {
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
    },
    ...options,
  });
};
