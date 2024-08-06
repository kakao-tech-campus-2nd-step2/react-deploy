import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { getCurrentBaseURL } from '@/api/instance';
const token = sessionStorage.getItem('token');

type DeleteWishParams = {
  wishId: string;
};

export const deleteWishPath = (wishId: string) => `${getCurrentBaseURL()}/api/wishes/${wishId}`;

const apiClient = axios.create({
  baseURL: getCurrentBaseURL(),
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const deleteWish = async (params: DeleteWishParams) => {
  const response = await apiClient.delete(deleteWishPath(params.wishId));
  return response.data;
};

export const useDeleteWishList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWish,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getWishList'] });
    },
  });
};
