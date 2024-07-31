import { OrderResponse } from '@internalTypes/responseTypes';
import { OrderRequest } from '@internalTypes/requestTypes';
import { ORDER_PATHS } from '@apis/path';
import axiosInstance from '@apis/instance';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const postOrders = async ({ optionId, quantity, message }: OrderRequest): Promise<OrderResponse> => {
  const res = await axiosInstance.post(ORDER_PATHS.ORDERS, {
    optionId,
    quantity,
    message,
  });
  return res.data;
};

export const useOrders = (): UseMutationResult<OrderResponse, AxiosError, OrderRequest> =>
  useMutation<OrderResponse, AxiosError, OrderRequest>({
    mutationFn: ({ optionId, quantity, message }: OrderRequest) => postOrders({ optionId, quantity, message }),
  });
