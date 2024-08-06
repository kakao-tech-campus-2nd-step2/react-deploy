// useGetProducts.ts
import {
  type InfiniteData,
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import type { ProductData } from '@/types';

import { BASE_URL } from '../instance';
import { PRODUCTS_MOCK_DATA } from './products.mock';

// import { fetchInstance } from './../instance/index';

type RequestParams = {
  categoryId: string;
  pageToken?: string;
  maxResults?: number;
};

type ProductsResponseRawData = {
  content: ProductData[];
  number: number;
  totalElements: number;
  size: number;
  last: boolean;
};

// 통신할 때 사용하기
// export const getProductsPath = ({}: RequestParams) => {
//   const params = new URLSearchParams();

//   params.append('page', '0');
//   params.append('size', '10');
//   params.append('sort', 'id,asc');
//   // if (pageToken) params.append('page', pageToken);
//   // if (maxResults) params.append('size', maxResults.toString());

//   return `${BASE_URL}/api/products?page=0&size=10&sort=id,asc`;
// };

export const getProductsPath = () => {
  return `${BASE_URL}/api/products`;
};

// 통신용
// export const getProducts = async (params: RequestParams): Promise<ProductsResponseRawData> => {
//   const response = await fetchInstance.get<ProductsResponseRawData>(getProductsPath(params));
//   return response.data;
// };

// 로컬 mock
export const getProducts = async (): Promise<ProductsResponseRawData> => {
  return PRODUCTS_MOCK_DATA;
};

type Params = Pick<RequestParams, 'maxResults' | 'categoryId'> & { initPageToken?: string };
export const useGetProducts = ({
  categoryId,
  maxResults = 20,
  initPageToken,
}: Params): UseInfiniteQueryResult<InfiniteData<ProductsResponseRawData>> => {
  return useInfiniteQuery({
    queryKey: ['products', categoryId, maxResults, initPageToken],
    queryFn: async ({}) => {
      return getProducts();
    },
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) =>
      lastPage.last === false ? (lastPage.number + 1).toString() : undefined,
  });
};
