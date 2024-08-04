import type { UseAxiosQueryWithPageResult } from '@/api';
import { useAxiosQueryWithPage } from '@/api';
import { sessionStorageApiWithAuth } from '@/api/axiosInstance';
import type { GetOrdersResponseBody } from '@/api/type';
import { authSessionStorage } from '@/utils/storage';

type RequestParams = {
  size?: number;
  page?: number;
  sort?: string;
};

export function getOrdersPath({ size, sort }: RequestParams): string {
  return `/api/orders?size=${size}&sort=${sort}`;
}

function useGetOrders({
  size = 20,
  sort = 'id,desc',
}: RequestParams): UseAxiosQueryWithPageResult<GetOrdersResponseBody> {
  const token = authSessionStorage.get()?.token ?? '';

  return useAxiosQueryWithPage<GetOrdersResponseBody>(
    {
      method: 'GET',
      url: getOrdersPath({ size, sort }),
    },
    ['orders'],
    (lastPage) => (!lastPage.last ? (lastPage.number + 1).toString() : undefined),
    sessionStorageApiWithAuth(token),
  );
}

export default useGetOrders;
