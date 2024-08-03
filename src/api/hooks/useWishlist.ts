import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';

export interface WishlistRequestParams {
  productId: string;
}

const WISHLIST_PATH = `${BASE_URL}/api/wishes`;
const getWishPath = (productId: string) => `${BASE_URL}/api/wishes/${productId}`;

export const fetchWishlist = () =>
  fetchInstance.get<WishlistRequestParams[]>(WISHLIST_PATH).then(res => res.data);

export const postWishlist = (params: WishlistRequestParams) =>
  fetchInstance.post<WishlistRequestParams>(WISHLIST_PATH, params).then(res => res.data);

const deleteWishlist = (productId: string) =>
  fetchInstance.delete<void>(getWishPath(productId)).then(res => res.status);

export const useFetchWishlist = () => {
  return useQuery({
    queryKey: [WISHLIST_PATH],
    queryFn: fetchWishlist,
  });
};

export const usePostWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [WISHLIST_PATH],
    mutationFn: postWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WISHLIST_PATH] });
    },
  });
};

export const useDeleteWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [WISHLIST_PATH],
    mutationFn: deleteWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WISHLIST_PATH] });
    },
  });
};
