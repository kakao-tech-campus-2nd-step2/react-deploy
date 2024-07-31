import { useMutation, useQueryClient } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';

export interface AddWishlistParams {
  product_id: number;
}

export const addWishlist = async (params: AddWishlistParams) => {
  const response = await fetchInstance.post(`${BASE_URL}/api/wishes`, params, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // TODO: 추후 수정 필요
    },
  });
  return response.data;
};

export const useAddWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
