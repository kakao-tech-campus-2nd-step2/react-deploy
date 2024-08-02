import {
  type InfiniteData,
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import type { PaginationResponseData, ProductRequestParams } from '@/api/types';
import { getProducts } from '@/api/utils';
import type { ProductData } from '@/types';

import { fetchInstance } from '../instance';

export type Params = Pick<ProductRequestParams, 'maxResults' | 'categoryId'> & {
  initPageToken?: string;
};

export const getProductsPath = ({ categoryId, pageToken, maxResults }: ProductRequestParams) => {
    const params = new URLSearchParams();

    params.append('page', pageToken || '0');
    params.append('sort', 'price,asc');

    if (maxResults) params.append('size', String(maxResults));

    return `${fetchInstance.defaults.baseURL}/api/products/categories/${categoryId}?${params.toString()}`;
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
