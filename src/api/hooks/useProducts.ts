import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchCategoryProducts } from '@/api/services/categoryProducts';
import { ProductsRequestParams } from '@/api/services/categoryProducts/types';

type ProductsParams = Pick<
  ProductsRequestParams,
  'maxResults' | 'categoryId'
> & { initPageToken?: string };

export const useProducts = ({
  categoryId,
  maxResults = 10,
  initPageToken,
}: ProductsParams) => {
  const { data, status, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['products', categoryId, maxResults, initPageToken],
    queryFn: ({ pageParam = initPageToken }) =>
      fetchCategoryProducts({ categoryId, pageToken: pageParam, maxResults }),
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });

  const categoryProducts = data?.pages.flatMap((page) => page.products);

  return {
    categoryProducts,
    status,
    error,
    fetchNextPage,
    hasNextPage,
  };
};
