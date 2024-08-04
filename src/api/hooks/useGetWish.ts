import { useQuery } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';

type WishlistProduct = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

type WishlistItem = {
  id: number;
  product: WishlistProduct;
};

type WishlistResponseData = {
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
};

export const WISHLIST_PATH = `${BASE_URL}/api/wishes`;

type WishlistRequestParams = {
  page?: number;
  size?: number;
  sort?: string;
};

export const getWishlistPath = ({
  page = 0,
  size = 10,
  sort = 'createdDate,desc',
  id,
}: WishlistRequestParams & { id?: number }) => {
  const params = new URLSearchParams();
  if (id !== undefined) {
    return `${WISHLIST_PATH}/${id}`;
  }
  params.append('page', page.toString());
  params.append('size', size.toString());
  params.append('sort', sort);
  return `${WISHLIST_PATH}?${params.toString()}`;
};

export const getWishlist = async (params: WishlistRequestParams): Promise<WishlistResponseData> => {
  const response = await fetchInstance.get<WishlistResponseData>(getWishlistPath(params), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust as per auth strategy
    },
  });
  return response.data;
};

export const useGetWishlist = (params: WishlistRequestParams = {}) =>
  useQuery({
    queryKey: ['wishlist', params.page, params.size, params.sort],
    queryFn: () => getWishlist(params),
  });
