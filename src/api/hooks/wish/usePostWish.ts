import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { authSessionStorage } from '@/utils/storage';

import { fetchInstance } from '../../instance';

type PostWishRequestParams = {
  productId: number;
};

const token = authSessionStorage.get();

const postWish = async (params: PostWishRequestParams) => {
  try {
    const response = await fetchInstance.post(`/api/wishes`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log('wish posted!');
    } else {
      console.log('성공은 했는데 200은 아닌: ', response.status);
    }

    return null;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      // 서버 응답이 있는 경우
      console.log('Error status:', axiosError.response.status);
      console.log('Error data:', axiosError.response.data);

      if (axiosError.response.status === 401 || 404) {
        throw new Error('로그인 필요');
      }
    } else if (axiosError.request) {
      // 요청이 전송되었지만 응답이 없는 경우
      console.log('No response received:', axiosError.request);
    } else {
      // 요청 설정 중에 발생한 에러
      console.log('Error message:', axiosError.message);
    }
    throw error;
  }
};

export const usePostWish = (): UseMutationResult<null, Error, PostWishRequestParams> => {
  return useMutation({
    mutationFn: (params: PostWishRequestParams) => postWish(params),
  });
};
