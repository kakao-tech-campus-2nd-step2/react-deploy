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

export const getWishlist = async (page: number) => {
  const response = await fetchInstance.get<{ data: WishlistResponseData }>(
    `${WISH_LIST_PATH}?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
      },
    },
  );
  return response.data.data;
};

export const useGetWishlist = (page: number = 1) =>
  useQuery({
    queryKey: wishlistQueryKey(page),
    queryFn: () => getWishlist(page),
  });
