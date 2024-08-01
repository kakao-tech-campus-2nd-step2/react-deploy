import {
  type InfiniteData,
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';
import axios from 'axios';

import { useBaseURL } from '@/provider/Auth/BaseUrlContext';
import type { ProductData } from '@/types';

type RequestParams = {
  categoryId: string;
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

const getProductsPath = (
  baseURL: string, // baseURL을 매개변수로 받음
  { categoryId, pageToken, maxResults }: RequestParams
) => {
  const params = new URLSearchParams();

  params.append('categoryId', categoryId);
  params.append('sort', 'name,asc');
  if (pageToken) params.append('page', pageToken);
  if (maxResults) params.append('size', maxResults.toString());

  return `${baseURL}/api/products?${params.toString()}`;
};

const getProducts = async (baseURL: string, params: RequestParams): Promise<ProductsResponseData> => {
  const response = await axios.get<ProductsResponseRawData>(getProductsPath(baseURL, params));
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
  const { baseURL } = useBaseURL();

  return useInfiniteQuery({
    queryKey: ['products', categoryId, maxResults, initPageToken],
    queryFn: async ({ pageParam = initPageToken }) => {
      return getProducts(baseURL, { categoryId, pageToken: pageParam, maxResults });
    },
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });
};
