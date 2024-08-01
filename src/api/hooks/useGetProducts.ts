import {
  type InfiniteData,
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import { BASE_URL } from '../instance';
import { fetchInstance } from './../instance/index';

interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  category: {
    id: number;
    name: string;
    color: string;
    description: string;
    image_url: string;
  };
}

interface ProductsResponseRawData {
  total_page: number;
  content: Product[];
}

interface ProductsResponseData {
  products: Product[];
  currentPage: number;
  totalPages: number;
}

interface Params {
  category_id: string;
  initPageToken?: string;
}

export const getProductsPath = ({
  category_id,
  pageToken,
}: {
  category_id: string;
  pageToken: string;
}) => {
  const params = new URLSearchParams();

  params.append('categoryId', category_id);
  params.append('page', pageToken);

  return `${BASE_URL}/api/products?${params.toString()}`;
};

export const getProducts = async (params: {
  category_id: string;
  pageToken: string;
}): Promise<ProductsResponseData> => {
  const response = await fetchInstance.get<ProductsResponseRawData>(getProductsPath(params));
  const data = response.data;
  console.log('데이터: ' + JSON.stringify(data));
  return {
    products: data.content,
    currentPage: parseInt(params.pageToken, 10) || 1,
    totalPages: data.total_page || 1,
  };
};

export const useGetProducts = ({
  category_id,
  initPageToken = '1',
}: Params): UseInfiniteQueryResult<InfiniteData<ProductsResponseData>> => {
  return useInfiniteQuery({
    queryKey: ['products', category_id, initPageToken],
    queryFn: async ({ pageParam = initPageToken }) => {
      const data = await getProducts({ category_id, pageToken: pageParam });
      console.log('useGetProducts fetched data:' + JSON.stringify(data));
      return data;
    },
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage, _) => {
      const nextPage = lastPage.currentPage + 1;
      return nextPage <= lastPage.totalPages ? nextPage.toString() : undefined;
    },
  });
};
