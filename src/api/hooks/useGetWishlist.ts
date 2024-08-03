import { useQuery } from '@tanstack/react-query';

import type { ProductData } from '@/types';

import { BASE_URL, fetchWithToken } from '../instance';

interface WishlistItem {
  id: number;
  product: ProductData;
}

interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

interface Pageable {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

interface WishlistResponseData {
  content: WishlistItem[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export const getWishlistPath = ({
  page = 0,
  size = 10,
  sort = 'createdDate,desc',
}: {
  page?: number;
  size?: number;
  sort?: string;
}) => `${BASE_URL}/api/wishes?page=${page}&size=${size}&sort=${sort}`;

export const getWishlist = async ({
  page = 0,
  size = 10,
  sort = 'createdDate',
}: {
  page?: number;
  size?: number;
  sort?: string;
}) => {
  const response = await fetchWithToken.get<WishlistResponseData>(
    getWishlistPath({ page, size, sort }),
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const useGetWishlist = ({
  page = 0,
  size = 10,
  sort = 'createdDate,desc', //TODO: crateDate -> createdDate,desc 로 변경
}: {
  page?: number;
  size?: number;
  sort?: string;
}) => {
  return useQuery({
    queryKey: ['wishlist', { page, size, sort }],
    queryFn: () => getWishlist({ page, size, sort }),
  });
};
