import { useMutation, useQueryClient } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '@/api/instance';

import type { WishRequestData } from './type';
import { getWishListPath } from './wish-list-add.api';

export const deleteWishListPath = (wishId: number) => `${BASE_URL}/api/wishes/${wishId}`;

export const deleteWishList = async (wishItem: WishRequestData) => {
  const response = await fetchInstance.delete(deleteWishListPath(wishItem.wishId));
  return response.data;
};

export const useDeleteWishList = () => {
  const queryClient = useQueryClient();
  const queryKey = [getWishListPath()];

  return useMutation({
    mutationFn: (wishId: WishRequestData) => deleteWishList(wishId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
