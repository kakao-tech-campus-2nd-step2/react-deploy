import {
  type InfiniteData,
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import type { PaginationResponseData, ProductRequestParams } from '@/api/types';
import { getProducts } from '@/api/utils';
import type { ProductData } from '@/types';

import { BASE_URL } from '../instance';

export type Params = Pick<ProductRequestParams, 'maxResults' | 'categoryId'> & {
  initPageToken?: string;
};

export const getProductsPath = ({ categoryId, pageToken, maxResults }: ProductRequestParams) => {
  const params = new URLSearchParams();

  params.append('categoryId', categoryId);
  params.append('sort', 'name,asc');
  if (pageToken) params.append('page', pageToken);
  if (maxResults) params.append('size', maxResults.toString());

  return `${BASE_URL}/api/products?${params.toString()}`;
};

export const useGetProducts = ({
  categoryId,
  maxResults = 20,
  initPageToken,
}: Params): UseInfiniteQueryResult<InfiniteData<PaginationResponseData<ProductData>>> =>
  useInfiniteQuery({
    queryKey: ['products', categoryId, maxResults, initPageToken],
    queryFn: async ({ pageParam = initPageToken }) => {
      return getProducts({ categoryId, pageToken: pageParam, maxResults });
    },
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });
