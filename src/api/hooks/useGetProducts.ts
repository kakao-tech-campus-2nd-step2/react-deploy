import { useInfiniteQuery } from '@tanstack/react-query';

import type { ProductData } from '@/types';
import { authSessionStorage } from '@/utils/storage';

import { BASE_URL } from '../instance';
import { fetchInstance } from './../instance/index';

type ProductsRequestParams = {
  categoryId: number;
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
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
  contents: ProductData[];
};

export const getProductsPath = () => `${BASE_URL}/api/products`;

export const getProducts = async (): Promise<ProductsResponseData> => {
  const response = await fetchInstance.get<ProductsResponseRawData>(getProductsPath(), {
    headers: {
      'Authorization': `Bearer ${authSessionStorage.get()?.token}`,
    },
  });
  const data = response.data;

  return {
    products: data.contents,
    nextPageToken: 
      data.page !== data.total_pages - 1
      ? (data.page + 1).toString()
      : undefined,
    pageInfo: {
      totalResults: data.total_elements,
      resultsPerPage: data.size,
    },
  };
};

type ProductsParams = Pick<
  ProductsRequestParams,
  'maxResults' | 'categoryId'
  > & { initPageToken?: string };

export const useGetProducts = ({
  categoryId,
  maxResults = 20,
  initPageToken,
}: ProductsParams) => {
  const { data, status, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['products', categoryId, maxResults, initPageToken],
    queryFn: getProducts,
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });

  const categoryProducts = data?.pages.flatMap((page) => page.products) ?? [];

  return {
    categoryProducts,
    status,
    error,
    fetchNextPage,
    hasNextPage,
  };
};
