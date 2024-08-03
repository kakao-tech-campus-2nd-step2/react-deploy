import {
  type InfiniteData,
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import type { ProductData } from '@/types';

import { BASE_URL } from '../instance';
import { fetchInstance } from './../instance/index';

type RequestParams = {
  categoryId: string;
<<<<<<< HEAD
  page?: string;
};

type ProductsResponseData = {
  data: {
    content: ProductData[];
    total_page: number;
  };
};

export const getProductsPath = ({ categoryId, page = '1' }: RequestParams) => {
  const params = new URLSearchParams();

  params.append('category', categoryId);
  params.append('page', page);
=======
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

export const getProductsPath = ({ categoryId, pageToken, maxResults }: RequestParams) => {
  const params = new URLSearchParams();

  params.append('categoryId', categoryId);
  params.append('sort', 'name,asc');
  if (pageToken) params.append('page', pageToken);
  if (maxResults) params.append('size', maxResults.toString());
>>>>>>> upstream/dlwltn0430

  return `${BASE_URL}/api/products?${params.toString()}`;
};

export const getProducts = async (params: RequestParams): Promise<ProductsResponseData> => {
<<<<<<< HEAD
  const response = await fetchInstance.get<ProductsResponseData>(getProductsPath(params));
  return response.data;
};

type Params = Pick<RequestParams, 'categoryId'> & { initPageToken?: string };
export const useGetProducts = ({
  categoryId,
  initPageToken,
}: Params): UseInfiniteQueryResult<InfiniteData<ProductsResponseData>> => {
  return useInfiniteQuery({
    queryKey: ['products', categoryId],
    queryFn: async ({ pageParam = initPageToken }) => {
      return getProducts({ categoryId, page: pageParam });
    },
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      return currentPage < lastPage.data.total_page ? (currentPage + 1).toString() : undefined;
    },
=======
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
>>>>>>> upstream/dlwltn0430
  });
};
