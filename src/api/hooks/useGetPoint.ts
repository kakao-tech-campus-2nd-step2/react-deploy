import type { UseQueryResult } from '@tanstack/react-query';

import { useAxiosQuery } from '@/api';
import { sessionStorageApiWithAuth } from '@/api/axiosInstance';
import type { GetPointResponseBody } from '@/api/type';
import { authSessionStorage } from '@/utils/storage';

export function getPointPath(): string {
  return '/api/members/point';
}

function useGetPoint(): UseQueryResult<GetPointResponseBody> {
  const token = authSessionStorage.get()?.token ?? '';

  return useAxiosQuery<GetPointResponseBody>(
    {
      method: 'GET',
      url: getPointPath(),
    },
    ['point'],
    {},
    sessionStorageApiWithAuth(token),
  );
}

export default useGetPoint;
