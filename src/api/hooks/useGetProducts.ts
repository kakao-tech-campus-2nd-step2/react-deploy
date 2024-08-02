import {
  type InfiniteData,
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import type { ProductData } from '@/types';

import { BASE_URL } from '../instance';
import { fetchWithTokenInstance } from './../instance/index';

type RequestParams = {
  categoryId: string;
  pageToken?: string;
  maxResults?: number;
};

type ProductsResponseData = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  products: ProductData[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

type ProductsResponseRawData = {
  content: ProductData[];
  number: number;
  totalElements: number;
  size: number;
  last: boolean;
};

export const getProductsPath = ({ categoryId, pageToken, maxResults }: RequestParams) => {
  const params = new URLSearchParams();

  params.append('categoryId', categoryId);
  // params.append('sort', 'name,asc');
  if (pageToken) params.append('page', pageToken);
  if (maxResults) params.append('size', maxResults.toString());

  return `${BASE_URL}/api/products?${params.toString()}`;
};

export const getProducts = async (params: RequestParams): Promise<ProductsResponseData> => {
  const response = await fetchWithTokenInstance.get<ProductsResponseRawData>(
    getProductsPath(params),
  );
  const data = response.data;

  return {
    data,
    products: data.content,
    nextPageToken: data.last === false ? (data.number + 1).toString() : undefined,
    pageInfo: {
      totalResults: data.totalElements,
      resultsPerPage: data.size,
    },
  };
};

type Params = Pick<RequestParams, 'maxResults' | 'categoryId'> & { initPageToken?: string };
export const useGetProducts = ({
  categoryId,
  maxResults = 20,
  initPageToken,
}: Params): UseInfiniteQueryResult<InfiniteData<ProductsResponseData>> => {
  return useInfiniteQuery({
    queryKey: ['products', categoryId, maxResults, initPageToken],
    queryFn: async ({ pageParam = initPageToken }) => {
      return getProducts({ categoryId, pageToken: pageParam, maxResults });
    },
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });
};
