import { useMutation } from '@tanstack/react-query';

import { ApiPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

import { fetchInstance } from '../instance';

export interface PostOrderRequestParams {
  optionId: number;
  message: string;
  quantity: number;
  productId: number;
  point: number;
  phone: string;
  receipt: boolean;
}

interface PostOrderResponseParams {
  id: number;
  optionId: number;
  quantity: number;
  orderDateTime: string;
  message: string;
  success: boolean;
}

const postOrder = async (params: PostOrderRequestParams): Promise<PostOrderResponseParams> => {
  const response = await fetchInstance.post<PostOrderResponseParams>(ApiPath.orders.root, params, {
    headers: {
      Authorization: `Bearer ${authSessionStorage.get()}`,
    },
  });

  return response.data;
};

export const usePostOrder = () => {
  return useMutation<PostOrderResponseParams, Error, PostOrderRequestParams>({
    mutationFn: postOrder,
  });
};
