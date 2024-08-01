import { type InfiniteData, useInfiniteQuery, type UseInfiniteQueryResult } from '@tanstack/react-query';

import { BASE_URL } from '../instance';
import { fetchInstance } from './../instance/index';

import type { OrderListData } from '@/types';
import { authSessionStorage } from '@/utils/storage';

type RequestParams = {
  pageToken?: string;
  maxResults?: number;
};

type OrderListsResponseData = {
  products: OrderListData[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

type OrderListsResponseRawData = {
  content: OrderListData[];
  number: number;
  totalElements: number;
  size: number;
  last: boolean;
};

export const getOrderListPath = ({ pageToken, maxResults }: RequestParams) => {
  const params = new URLSearchParams();

  if (pageToken) params.append('page', pageToken);
  if (maxResults) params.append('size', maxResults.toString());
  params.append('sort', 'orderDateTime,desc');

  return `${BASE_URL}/api/orders?${params.toString()}`;
};

export const getOrderLists = async (params: RequestParams): Promise<OrderListsResponseData> => {
  const response = await fetchInstance.get<OrderListsResponseRawData>(getOrderListPath(params), {
    headers: {
      Authorization: `Bearer ${authSessionStorage.get()?.token}`,
    },
  });
  const data = response.data;
  return {
    products: data.content,
    nextPageToken: data.last === false ? (data.number + 1).toString() : undefined,
    pageInfo: {
      totalResults: data.totalElements,
      resultsPerPage: data.size,
    },
  };
};

type Params = Pick<RequestParams, 'maxResults'> & { initPageToken?: string };
export const useGetOrderList = ({
  maxResults = 10,
  initPageToken,
}: Params): UseInfiniteQueryResult<InfiniteData<OrderListsResponseData>> => {
  return useInfiniteQuery({
    queryKey: ['orderLists', maxResults, initPageToken],
    queryFn: async ({ pageParam = initPageToken }) => {
      return getOrderLists({ pageToken: pageParam, maxResults });
    },
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });
};
