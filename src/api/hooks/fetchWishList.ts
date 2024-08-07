import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { authSessionStorage } from '@/utils/storage';

import { fetchInstance } from '../instance';

const getToken = () => authSessionStorage.get();

// Constants for query keys
const QUERY_KEYS = {
  WISH_LIST: 'wishList',
};

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

// Helper function to get authorization headers
const getAuthHeaders = () => {
  const token = getToken();
  if (!token) throw new Error('토큰이 없습니다.');
  return {
    Authorization: `Bearer ${token}`,
  };
};

const fetchWishList = async (page: number, size: number): Promise<WishListResponse> => {
  const response = await fetchInstance.get('/api/wishes', {
    headers: getAuthHeaders(),
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
    queryKey: [QUERY_KEYS.WISH_LIST, page, size],
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
      return fetchInstance.delete(`/api/wishes`, {
        headers: {
          ...getAuthHeaders(),
          'Cache-Control': 'no-cache',
        },
        data: { productId },
      });
    },
    onSuccess: () => {
      console.log('Item successfully removed, invalidating and refetching wishList');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WISH_LIST] });
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.WISH_LIST] }); // 쿼리를 강제로 다시 페치합니다
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
      return fetchInstance.post(
        '/api/wishes',
        { productId },
        {
          headers: getAuthHeaders(),
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WISH_LIST] });
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.WISH_LIST] });
    },
    ...options,
  });
};
