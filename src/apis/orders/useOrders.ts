import { OrderResponse } from '@internalTypes/responseTypes';
import { OrderRequest } from '@internalTypes/requestTypes';
import { ORDER_PATHS } from '@apis/path';
import { initInstance } from '@apis/instance';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useAPI } from '@context/api/useAPI';

const postOrders = async ({ optionId, quantity, message }: OrderRequest, baseURL: string): Promise<OrderResponse> => {
  const instance = initInstance(baseURL);
  const res = await instance.post(
    ORDER_PATHS.ORDERS,
    {
      optionId,
      quantity,
      message,
    },
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
      },
    },
  );
  return res.data;
};

export const useOrders = (): UseMutationResult<OrderResponse, AxiosError, OrderRequest> => {
  const { baseURL } = useAPI();

  return useMutation<OrderResponse, AxiosError, OrderRequest>({
    mutationFn: ({ optionId, quantity, message }: OrderRequest) => postOrders({ optionId, quantity, message }, baseURL),
  });
};
