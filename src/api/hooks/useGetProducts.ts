import {
  type InfiniteData,
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import type { ProductData } from '@/types';

import { BASE_URL } from '../instance';
import { fetchInstance } from './../instance/index';

type RequestParams = {
  category_id: string;
  pageToken?: string;
  maxResults?: number;
};

type ProductsResponseData = {
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

export const getProductsPath = ({ category_id, pageToken, maxResults }: RequestParams) => {
  const params = new URLSearchParams();

  params.append('categoryId', category_id);
  params.append('sort', 'name,asc');
  if (pageToken) params.append('page', pageToken);
  if (maxResults) params.append('size', maxResults.toString());

  return `${BASE_URL}/api/products?${params.toString()}`;
};

export const getProducts = async (params: RequestParams): Promise<ProductsResponseData> => {
  const response = await fetchInstance.get<ProductsResponseRawData>(getProductsPath(params));
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

type Params = Pick<RequestParams, 'maxResults' | 'category_id'> & { initPageToken?: string };
export const useGetProducts = ({
  category_id,
  maxResults = 20,
  initPageToken,
}: Params): UseInfiniteQueryResult<InfiniteData<ProductsResponseData>> => {
  return useInfiniteQuery({
    queryKey: ['products', category_id, maxResults, initPageToken],
    queryFn: async ({ pageParam = initPageToken }) => {
      return getProducts({ category_id, pageToken: pageParam, maxResults });
    },
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });
};
