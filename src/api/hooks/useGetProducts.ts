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
  products: ProductData[];
};

export const getProductsPath = ({ categoryId, page_token, max_results }: RequestParams) => {
  const params = new URLSearchParams();

  params.append('sort', 'name,asc');
  params.append('category_id', categoryId);
  if (page_token) params.append('page', page_token);
  if (max_results) params.append('size', max_results.toString());

  return `${BASE_URL}/api/products?${params.toString()}`;
};

export const getProducts = async (params: RequestParams): Promise<ProductsResponseData> => {
  const url = getProductsPath(params);
  const response = await fetchInstance.get<ProductsResponseRawData>(url);
  const data = response.data;

  console.log('Fetched Data:', data);

  return {
    products: data.products.filter((product) => product.id && product.name && product.price),
    next_page_token: undefined,
    page_info: {
      total_results: data.products.length,
      results_per_page: data.products.length,
    },
  };
};

type Params = Pick<RequestParams, 'max_results' | 'categoryId'> & { init_page_token?: string };
export const useGetProducts = ({
  categoryId,
  max_results = 20,
  init_page_token,
}: Params): UseInfiniteQueryResult<InfiniteData<ProductsResponseData>> => {
  return useInfiniteQuery({
    queryKey: ['products', categoryId, max_results, init_page_token],
    queryFn: async ({ pageParam = init_page_token }) => {
      return getProducts({ categoryId, page_token: pageParam, max_results });
    },
    initialPageParam: init_page_token,
    getNextPageParam: (lastPage) => lastPage.next_page_token,
  });
};
