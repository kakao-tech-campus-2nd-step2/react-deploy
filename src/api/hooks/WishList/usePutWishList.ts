import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { getCurrentBaseURL } from '@/api/instance/index';

const token = sessionStorage.getItem('token');

type PutWishProps = {
  productId: string;
};

export const putWishPath = () => {
  return `${getCurrentBaseURL()}/api/wishes`;
};

const apiClient = axios.create({
  baseURL: getCurrentBaseURL(),
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const putWish = async ({ productId }: PutWishProps) => {
  const response = await apiClient.post(putWishPath(), { productId });

  return response.data;
};

export const usePutWishList = () => {
  return useMutation({
    mutationFn: putWish,
    onSuccess: () => {
      console.log('wishlist');
    },
  });
};
