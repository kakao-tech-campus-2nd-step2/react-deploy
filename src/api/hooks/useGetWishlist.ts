import { useQuery } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';

export interface WishlistProduct {
  id: number;
<<<<<<< HEAD
  product_id: number;
  product_name: string;
  image_url: string;
}

export interface WishlistResponseData {
  total_page: number;
  content: WishlistProduct[];
=======
  name: string;
  price: number;
  imageUrl: string;
}

export interface WishlistItem {
  id: number;
  product: WishlistProduct;
}

export interface WishlistResponseData {
  content: WishlistItem[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
>>>>>>> upstream/dlwltn0430
}

export const WISH_LIST_PATH = `${BASE_URL}/api/wishes`;

<<<<<<< HEAD
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
=======
const wishlistQueryKey = (page: number, size: number, sort: string) => [
  'wishlist',
  page,
  size,
  sort,
];

export const getWishlist = async () => {
  const response = await fetchInstance.get<WishlistResponseData>(WISH_LIST_PATH, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // TODO: 추후 수정 필요
    },
  });
  return response.data;
};

export const useGetWishlist = (
  page: number = 0,
  size: number = 10,
  sort: string = 'createdDate,desc',
) =>
  useQuery({
    queryKey: wishlistQueryKey(page, size, sort),
    queryFn: () => getWishlist(),
>>>>>>> upstream/dlwltn0430
  });
