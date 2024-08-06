import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchInstance } from '../instance';
import { getWishlistPath } from './useGetWish';

export const deleteWishlistItemAsync = async (wishId: number) => {
  await fetchInstance.delete(getWishlistPath({ id: wishId }), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const useDeleteWishlistItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (wishId: number) => deleteWishlistItemAsync(wishId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
    onError: () => console.log('Error occurred here'),
  });
};
