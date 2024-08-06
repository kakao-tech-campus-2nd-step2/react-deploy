import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import type { OrderData } from '@/types';

import { getCurrentBaseURL } from '../instance';

export const postOrdersPath = () => {
  return `${getCurrentBaseURL()}/api/orders`;
};

const token = sessionStorage.getItem('token');

const apiClient = axios.create({
  baseURL: getCurrentBaseURL(),
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const postOrder = async ({ orderlist }: OrderData) => {
  const response = await apiClient.post(postOrdersPath(), { orderlist });
  return response.data;
};

export const usePostOrders = () => {
  return useMutation({
    mutationFn: postOrder,
    onSuccess: () => {
      console.log('order');
    },
  });
};
