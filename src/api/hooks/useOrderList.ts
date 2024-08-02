import { useInfiniteQuery } from '@tanstack/react-query';

import { OrderListRequestParams, fetchOrderList } from '@/api/services/order';

type OrderListParams = Pick<OrderListRequestParams, 'size'> & {
  initPageToken?: string;
};

export const useOrderList = ({ size = 3, initPageToken }: OrderListParams) => {
  const { data, status, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['orderList', size, initPageToken],
    queryFn: ({ pageParam = initPageToken }) =>
      fetchOrderList({ size, page: pageParam }),
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
    staleTime: 0,
  });

  const orderList = data?.pages.flatMap((page) => page.orderList);

  return {
    orderList,
    status,
    error,
    fetchNextPage,
    hasNextPage,
  };
};
