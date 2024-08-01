import {
  type InfiniteData,
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';

type Wish = {
  id: number;
  product_id: number;
  product_name: string;
  product_price: number;
  image_url: string;
};

export type WishesResponseData = {
  wishes: Wish[];
  nextPageToken?: number;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

export type WishesResponseRawData = {
  data: {
    total_page: number;
    content: Wish[];
  };
};

type RequestParams = {
  page: number;
};

export const getWishesPath = ({ page }: RequestParams) => {
  const params = new URLSearchParams();

  params.append('page', page.toString());

  return `${BASE_URL}/api/wishes?${params.toString()}`;
};

export const getWishes = async (params: RequestParams): Promise<WishesResponseData> => {
  const response = await fetchInstance.get<WishesResponseRawData>(getWishesPath(params));
  const data = response.data;

  return {
    wishes: data.data.content,
    nextPageToken: params.page < data.data.total_page ? params.page + 1 : undefined,
    pageInfo: {
      totalResults: data.data.content.length,
      resultsPerPage: data.data.content.length,
    },
  };
};

type Params = {
  initPage?: number;
};

export const useGetWishes = ({
  initPage = 0,
}: Params): UseInfiniteQueryResult<InfiniteData<WishesResponseData>> => {
  return useInfiniteQuery({
    queryKey: ['wishes', initPage],
    queryFn: async ({ pageParam = initPage }) => {
      return getWishes({ page: pageParam });
    },
    initialPageParam: initPage,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });
};
