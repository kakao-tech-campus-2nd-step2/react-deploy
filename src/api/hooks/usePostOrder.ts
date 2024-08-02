import { useMutation } from '@tanstack/react-query';

import { APIPath } from '../apiPath';
import { BASE_URL, fetchInstanceWithAuth } from '../instance';

export type OrderRequest = {
  optionId: number;
  quantity: number;
  message: string;
  usedPoint: number;
};

export type OrderResponse = {
  id: number;
  optionId: number;
  quantity: number;
  orderDateTime: Date;
  message: string;
};

export const getOrderPath = () => `${BASE_URL}${APIPath.order}`;

export const postOrder = async (req: OrderRequest) => {
  const token = localStorage.getItem('token') ?? '';
  const response = await fetchInstanceWithAuth(token).post<OrderResponse>(getOrderPath(), req);
  return response.data;
};

export const FetchPutWish = () =>
  useMutation({
    mutationFn: postOrder,
  });
