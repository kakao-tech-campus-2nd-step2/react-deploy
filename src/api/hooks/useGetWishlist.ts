import {
  type InfiniteData,
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import { useAuth } from '@/provider/Auth';

type WishlistItem = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

type WishlistResponseData = {
  content: WishlistItem[];
  pageable: {
    sort: {
      sorted: boolean;
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

type RequestParams = {
  pageToken?: string;
  maxResults?: number;
};

const getWishlistPath = ({ pageToken, maxResults }: RequestParams) => {
  const params = new URLSearchParams();
  params.append('sort', 'createdDate,desc');
  if (pageToken) params.append('page', pageToken);
  if (maxResults) params.append('size', maxResults.toString());

  return `/api/wishes?${params.toString()}`;
};

export const getWishlist = async (params: RequestParams, token: string): Promise<WishlistResponseData> => {
  const url = getWishlistPath(params);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data: WishlistResponseData = await response.json();
  return data;
};

export const useGetWishlist = ({
  maxResults = 10,
  initPageToken,
}: { maxResults?: number; initPageToken?: string }): UseInfiniteQueryResult<InfiniteData<WishlistResponseData>> => {
  const authInfo = useAuth();

  return useInfiniteQuery({
    queryKey: ['wishlist', maxResults, initPageToken],
    queryFn: async ({ pageParam = initPageToken }) => {
      if (!authInfo?.token) {
        throw new Error('Authentication token is missing');
      }
      return getWishlist({ pageToken: pageParam, maxResults }, authInfo.token);
    },
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => (lastPage.last ? undefined : (lastPage.number + 1).toString()),
  });
};
