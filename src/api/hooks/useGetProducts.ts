import {
  type InfiniteData,
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import type { ProductData } from '@/types';
import { useServer } from '@/provider/ServerProvider';

import { fetchInstance } from './../instance/index';

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

export const getProductsPath = (
  serverURL: string,
  { categoryId, pageToken, maxResults }: RequestParams
) => {
  const params = new URLSearchParams();

  params.append('categoryId', categoryId);
  params.append('sort', 'name,asc');
  if (pageToken) params.append('page', pageToken);
  if (maxResults) params.append('size', maxResults.toString());

  return `${serverURL}/api/products?${params.toString()}`;
};

export const getProducts = async (
  serverURL: string,
  params: RequestParams
): Promise<ProductsResponseData> => {
  const response = await fetchInstance.get<ProductsResponseRawData>(
    getProductsPath(serverURL, params)
  );
  const data = response.data;

  return {
    products: data.content,
    nextPageToken:
      data.last === false ? (data.number + 1).toString() : undefined,
    pageInfo: {
      totalResults: data.totalElements,
      resultsPerPage: data.size,
    },
  };
};

type Params = Pick<RequestParams, 'maxResults' | 'categoryId'> & {
  initPageToken?: string;
};
export const useGetProducts = ({
  categoryId,
  maxResults = 20,
  initPageToken,
}: Params): UseInfiniteQueryResult<InfiniteData<ProductsResponseData>> => {
  const { serverURL } = useServer();

  return useInfiniteQuery({
    queryKey: ['products', categoryId, maxResults, initPageToken],
    queryFn: async ({ pageParam = initPageToken }) => {
      return getProducts(serverURL, {
        categoryId,
        pageToken: pageParam,
        maxResults,
      });
    },
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });
};
