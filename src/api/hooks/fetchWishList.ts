import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { authSessionStorage } from '@/utils/storage';

<<<<<<< HEAD
import { BASE_URL, fetchInstance } from '../instance';
import { login } from './auth';

const QUERY_KEY_WISHLIST = 'wishList';
=======
import { fetchInstance } from '../instance';

const getToken = () => authSessionStorage.get();
>>>>>>> 9fc38c008ccc8550a44151a08744a569411c2258

export interface WishItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface WishListResponse {
  content: WishItem[];
  page: {
<<<<<<< HEAD
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

export const getWishListPath = (page: number, size: number) =>
  `${BASE_URL}/api/wishes?page=${page}&size=${size}&sort=id,desc`;

const fetchWishList = async (
  token: string,
  page: number,
  size: number,
): Promise<WishListResponse> => {
  console.log('관심 목록 요청, 사용된 토큰:', token);
  const response = await fetchInstance.get(getWishListPath(page, size), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
=======
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
>>>>>>> 9fc38c008ccc8550a44151a08744a569411c2258
  });
  console.log('관심 목록 응답:', response.data);
  return response.data;
};

const fetchNewToken = async (): Promise<string> => {
  const email = localStorage.getItem('email');
  const password = localStorage.getItem('password');
  console.log('토큰 갱신 시도, 저장된 이메일 및 비밀번호:', { email, password });

  if (!email || !password) {
    throw new Error('No email or password found in localStorage');
  }

  const token = await login(email, password); // 로그인 API를 호출하여 토큰을 갱신
  console.log('새로 받은 토큰:', token);
  authSessionStorage.set(token); // 새로운 토큰을 저장
  return token;
};

const getToken = async (): Promise<string> => {
  let token = authSessionStorage.get();
  console.log('기존 토큰:', token);
  if (!token) {
    token = await fetchNewToken();
  }
  return token;
};

export const useWishList = (
  page: number = 0,
  size: number = 10,
  options?: UseQueryOptions<WishListResponse, AxiosError>,
) => {
<<<<<<< HEAD
  return useQuery<WishListResponse, Error>({
    queryKey: [QUERY_KEY_WISHLIST, page, size],
    queryFn: async () => {
      const token = await getToken();
      return fetchWishList(token, page, size);
    },
=======
  return useQuery<WishListResponse, AxiosError>({
    queryKey: ['wishList', page, size],
    queryFn: () => fetchWishList(page, size),
>>>>>>> 9fc38c008ccc8550a44151a08744a569411c2258
    ...options,
  });
};

export const useRemoveWish = (
  options?: UseMutationOptions<void, AxiosError, { productId: number }>,
) => {
  const queryClient = useQueryClient();

<<<<<<< HEAD
  return useMutation<void, Error, number>({
    mutationFn: async (wishId: number) => {
      const token = await getToken();
      console.log('관심 항목 삭제 요청, 사용된 토큰:', token);
      return fetchInstance.delete(`/api/wishes/${wishId}`, {
=======
  return useMutation<void, AxiosError, { productId: number }>({
    mutationFn: async ({ productId }) => {
      const token = getToken();
      if (!token) throw new Error('토큰이 없습니다.');
      return fetchInstance.delete(`/api/wishes`, {
>>>>>>> 9fc38c008ccc8550a44151a08744a569411c2258
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { productId },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishList'] });
    },
    ...options,
  });
};

<<<<<<< HEAD
export const useAddWish = (options?: UseMutationOptions<void, Error, number>) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (productId: number) => {
      let token = await getToken();
      console.log('관심 항목 추가 요청, 사용된 토큰:', token, 'and productId:', productId);

      try {
        return await fetchInstance.post(
          '/api/wishes',
          { productId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
=======
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
>>>>>>> 9fc38c008ccc8550a44151a08744a569411c2258
          },
        );
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          console.log('토큰이 유효하지 않아 갱신 시도');
          token = await fetchNewToken();
          return await fetchInstance.post(
            '/api/wishes',
            { productId },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
        } else {
          throw error;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishList'] });
    },
<<<<<<< HEAD
    onError: (error, _variables, _context) => {
      if (axios.isAxiosError(error)) {
        console.error('관심 상품 추가 중 오류 발생:', error.response?.data || error.message);
      } else {
        console.error('관심 상품 추가 중 오류 발생:', error.message);
      }
      alert('관심 상품 추가 중 오류가 발생했습니다.');
    },
=======
>>>>>>> 9fc38c008ccc8550a44151a08744a569411c2258
    ...options,
  });
};
