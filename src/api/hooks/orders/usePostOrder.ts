import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { OrderFormData } from '@/types';
import { authSessionStorage } from '@/utils/storage';

import { fetchInstance } from '../../instance';

// 요청
type OrderRequestParams = OrderFormData;

// 응답 객체
type OrderResponseData = {
  optionId: number;
};

const token = authSessionStorage.get();

const postOrder = async (params: OrderRequestParams) => {
  try {
    const response = await fetchInstance.post<OrderResponseData>(`/api/orders`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log('order success!');
    } else {
      console.log('성공은 했는데 200은 아닌: ', response.status);
    }

    return response.data;
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

export const usePostOrder = (): UseMutationResult<OrderResponseData, Error, OrderRequestParams> => {
  return useMutation({
    mutationFn: (params: OrderRequestParams) => postOrder(params),
  });
};
