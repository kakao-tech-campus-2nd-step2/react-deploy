import { OrderResponse } from '@internalTypes/responseTypes';
import { OrderRequest } from '@internalTypes/requestTypes';
import { ORDER_PATHS } from '@apis/path';
import initInstance from '@apis/instance';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const ordersInstance = initInstance(process.env.REACT_APP_EUN_KYOUNG_BASE_URL);

const postOrders = async ({ optionId, quantity, message }: OrderRequest): Promise<OrderResponse> => {
  const res = await ordersInstance.post(
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

export const useOrders = (): UseMutationResult<OrderResponse, AxiosError, OrderRequest> =>
  useMutation<OrderResponse, AxiosError, OrderRequest>({
    mutationFn: ({ optionId, quantity, message }: OrderRequest) => postOrders({ optionId, quantity, message }),
  });
