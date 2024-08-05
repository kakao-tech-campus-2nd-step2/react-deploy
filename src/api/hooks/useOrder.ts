// src/api/hooks/useOrder.ts
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { fetchInstance, BASE_URL } from '../instance';

type OrderParams = {
  optionId: number;
  quantity: number;
  message: string;
};

type OrderResponse = {
  id: number;
  optionId: number;
  quantity: number;
  orderDateTime: string;
  message: string;
};

type CreateOrderVariables = {
  params: OrderParams;
  token: string;
};

const createOrder = async ({ params, token }: CreateOrderVariables): Promise<OrderResponse> => {
  const response = await fetchInstance.post<OrderResponse>(
    `${BASE_URL}/api/orders`,
    params,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const useOrder = () => {
  return useMutation<OrderResponse, Error, CreateOrderVariables>({
    mutationFn: createOrder
  });
};