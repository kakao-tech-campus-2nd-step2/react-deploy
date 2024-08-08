import type { UseAxiosQueryWithPageResult } from '@/api';
import { useAxiosQueryWithPage } from '@/api';
import { sessionStorageApiWithAuth } from '@/api/axiosInstance';
import type { GetWishesResponseBody } from '@/api/type';
import { authSessionStorage } from '@/utils/storage';

type RequestParams = {
  size?: number;
  sort?: string;
};

export function getWishesPath({ size, sort }: RequestParams): string {
  return '/api/wishes' + (size ? `?size=${size}` : '') + (sort ? `&sort=${sort}` : '');
}

function useGetWishes({
  size = 10,
  sort = 'id,desc',
}: RequestParams): UseAxiosQueryWithPageResult<GetWishesResponseBody> {
  const token = authSessionStorage.get()?.token ?? '';

  return useAxiosQueryWithPage<GetWishesResponseBody>(
    {
      method: 'GET',
      url: getWishesPath({ size, sort }),
    },
    ['wishes'],
    (lastPage) =>
      lastPage.last !== undefined && !lastPage.last
        ? (lastPage?.number || 0 + 1).toString()
        : undefined,
    sessionStorageApiWithAuth(token),
  );
}

export default useGetWishes;
