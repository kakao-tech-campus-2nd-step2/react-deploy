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

  return `${BASE_URL}/api/products?${params.toString()}`;
};

export const getProducts = async (params: RequestParams): Promise<ProductsResponseData> => {
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
  });
};
