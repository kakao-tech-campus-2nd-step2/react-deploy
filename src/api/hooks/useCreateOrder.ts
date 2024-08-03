import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { BASE_URL, fetchInstance } from '../instance';

interface CreateOrderParams {
  quantity: number;
  message: string;
  option_id: number;
}

interface ErrorResponse {
  message: string;
}

const createOrder = async (params: CreateOrderParams, token: string): Promise<void> => {
  await fetchInstance.post(`${BASE_URL}/api/orders`, params, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ErrorResponse>, CreateOrderParams & { token: string }>({
    mutationFn: ({ token, ...params }) => createOrder(params, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      alert('주문 완료');
    },
    onError: (error) => {
      console.error(error);
      alert(error.response?.data?.message || '주문 생성 중 오류가 발생했습니다.');
    },
  });
};
