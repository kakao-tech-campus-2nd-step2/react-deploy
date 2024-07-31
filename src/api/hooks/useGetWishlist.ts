import { useQuery } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';

export interface WishlistProduct {
  id: number;
  product_id: number;
  product_name: string;
  image_url: string;
}

export interface WishlistResponseData {
  total_page: number;
  content: WishlistProduct[];
}

export const WISH_LIST_PATH = `${BASE_URL}/api/wishes`;

const wishlistQueryKey = (page: number) => ['wishlist', page];

export const getWishlist = async () => {
  const response = await fetchInstance.get<{ data: WishlistResponseData }>(WISH_LIST_PATH, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // TODO: 추후 수정 필요
    },
  });
  return response.data.data;
};

export const useGetWishlist = (page: number = 0) =>
  useQuery({
    queryKey: wishlistQueryKey(page),
    queryFn: () => getWishlist(),
  });
