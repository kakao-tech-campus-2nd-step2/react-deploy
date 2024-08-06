import { useMutation } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';

import { authSessionStorage } from '@/utils/storage';

type OrderRequestData = {
  productId: number;
  optionId: number;
  quantity: number;
  message: string;
};
const postOrder = async ({ productId, optionId, quantity, message }: OrderRequestData) => {
  const response = await fetchInstance.post(`${BASE_URL}/api/orders`, {
    headers: {
      Authorization: `Bearer ${authSessionStorage.get()?.token}`,
    },
    body: {
      productId: productId,
      optionId: optionId,
      quantity: quantity,
      message: message,
    },
  });
  return response.data;
};

export const useOrder = () => {
  return useMutation({
    mutationFn: ({ productId, optionId, quantity, message }: OrderRequestData) =>
      postOrder({ productId, optionId, quantity, message }),
  });
};
