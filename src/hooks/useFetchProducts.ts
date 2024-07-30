import { useCallback } from 'react';
import { axiosInstance } from '@utils/network';
import RequestURLs from '@constants/RequestURLs';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { QueryKeys } from '@constants/QueryKeys';
import { WishedProductsRequestQuery } from '@/types/request';
import {
  OrderedProductsResponse,
  PagedProductReponse,
  WishedProductsResponse,
} from '@/types/response';

interface UseFetchProductsProps {
  productType: 'ordered' | 'wished';
  itemsPerPage: number;
  sort: string;
}

function useFetchProducts({ productType, itemsPerPage, sort }: UseFetchProductsProps) {
  const fetchPage = useCallback(async ({ pageParam = 1 }) => {
    const params: WishedProductsRequestQuery = {
      size: itemsPerPage,
      page: pageParam,
      sort,
    };
    const url = productType === 'ordered' ? RequestURLs.ORDER : RequestURLs.WISHES;
    const response = await axiosInstance.get<PagedProductReponse>(
      url,
      {
        params,
      },
    );
    console.log(url);

    return productType === 'ordered'
      ? response.data as OrderedProductsResponse
      : response.data as WishedProductsResponse;
  }, [itemsPerPage, productType, sort]);

  const {
    data, fetchNextPage, hasNextPage, hasPreviousPage, isFetchingNextPage, refetch,
  } = useSuspenseInfiniteQuery({
    initialData: undefined,
    initialPageParam: undefined,
    queryKey: [QueryKeys.PRODUCTS, productType],
    queryFn: fetchPage,
    getNextPageParam: (lastPage) => (
      lastPage.last ? undefined : lastPage.pageable.pageNumber + 1
    ),
    getPreviousPageParam: (firstPage) => (
      firstPage.first ? undefined : firstPage.pageable.pageNumber - 1
    ),
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    refetch,
  };
}

export default useFetchProducts;
