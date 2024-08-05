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
  page_token?: string;
  max_results?: number;
};

type ProductsResponseData = {
  products: ProductData[];
  next_page_token?: string;
  page_info: {
    total_results: number;
    results_per_page: number;
  };
};

type ProductsResponseRawData = {
  content: ProductData[];
  number: number;
  total_elements: number;
  size: number;
  last: boolean;
};

export const getProductsPath = ({ category_id, page_token, max_results }: RequestParams) => {
  const params = new URLSearchParams();

  params.append('categoryId', category_id);
  params.append('sort', 'name,asc');
  if (page_token) params.append('page', page_token);
  if (max_results) params.append('size', max_results.toString());

  return `${BASE_URL}/api/products?${params.toString()}`;
};

export const getProducts = async (params: RequestParams): Promise<ProductsResponseData> => {
  const response = await fetchInstance.get<ProductsResponseRawData>(getProductsPath(params));
  const data = response.data;

  return {
    products: data.content,
    next_page_token: data.last === false ? (data.number + 1).toString() : undefined,
    page_info: {
      total_results: data.total_elements,
      results_per_page: data.size,
    },
  };
};

type Params = Pick<RequestParams, 'max_results' | 'category_id'> & { init_page_token?: string };
export const useGetProducts = ({
  category_id,
  max_results = 20,
  init_page_token,
}: Params): UseInfiniteQueryResult<InfiniteData<ProductsResponseData>> => {
  return useInfiniteQuery({
    queryKey: ['products', category_id, max_results, init_page_token],
    queryFn: async ({ pageParam = init_page_token }) => {
      return getProducts({ category_id, page_token: pageParam, max_results });
    },
    initialPageParam: init_page_token,
    getNextPageParam: (lastPage) => lastPage.next_page_token,
  });
};
