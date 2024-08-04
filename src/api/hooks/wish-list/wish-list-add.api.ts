import { useMutation } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '@/api/instance';
import type { WishData } from '@/types/wishlist';

export const getWishListPath = () => `${BASE_URL}/api/wishlist`;

export const getWishList = async (product: WishData) => {
  const response = await fetchInstance.post<WishData>(getWishListPath(), product);
  return response.data;
};

export const useGetWishList = () => {
  return useMutation({
    mutationFn: (product: WishData) => getWishList(product),
  });
};
