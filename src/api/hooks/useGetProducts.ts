import {
  type InfiniteData,
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import { ApiPath } from '@/routes/path';
import type { ProductData } from '@/types';

import { fetchInstance } from '../instance';

interface RequestParams {
  categoryId: string;
  sort?: string;
  page: number;
  size?: number;
}

interface ProductsResponseData {
  products: ProductData[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

interface ProductsResponseRawData {
  products: ProductData[];
  number: number;
  totalElements: number;
  size: number;
  last: boolean;
}

export const getProducts = async (params: RequestParams): Promise<ProductsResponseData> => {
  const response = await fetchInstance.get<ProductsResponseRawData>(ApiPath.products.root, {
    params: {
      categoryId: params.categoryId,
      sort: params.sort || 'id,desc',
      page: params.page,
      size: params.size || 20,
    },
  });
  const data = response.data;
  console.log(data);

  return {
    products: data.products,
    nextPageToken: data.last === false ? (data.number + 1).toString() : undefined,
    pageInfo: {
      totalResults: data.totalElements,
      resultsPerPage: data.size,
    },
  };
};

type Params = Pick<RequestParams, 'size' | 'categoryId'> & { initPageToken?: string };
export const useGetProducts = ({
  categoryId,
  size = 20,
  initPageToken,
}: Params): UseInfiniteQueryResult<InfiniteData<ProductsResponseData>> => {
  return useInfiniteQuery({
    queryKey: ['products', categoryId, size, initPageToken],
    queryFn: async ({ pageParam = initPageToken }) => {
      return getProducts({ categoryId, page: parseInt(pageParam ?? '0', 10), size });
    },
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });
};
