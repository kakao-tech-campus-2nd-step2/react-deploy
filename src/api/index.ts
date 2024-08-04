/* eslint-disable react-hooks/exhaustive-deps */
import type {
  GetNextPageParamFunction,
  InfiniteData,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
} from '@tanstack/react-query';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from '@tanstack/react-query';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';

import { sessionStorageApi } from '@/api/axiosInstance';

export function useAxiosQuery<T>(
  axiosOptions: AxiosRequestConfig,
  keys: string[],
  queryOptions?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>,
  axiosInstance: AxiosInstance = sessionStorageApi(),
): UseQueryResult<T> {
  return useQuery({
    queryKey: keys,
    queryFn: async (): Promise<T> => axiosInstance(axiosOptions).then((res) => res.data),
    ...(queryOptions || {}),
  });
}

export type UseAxiosQueryWithPageResult<T> = UseInfiniteQueryResult<InfiniteData<T>>;
export function useAxiosQueryWithPage<T>(
  axiosOptions: AxiosRequestConfig,
  keys: string[],
  getNextPageParam: (lastPage: T) => string | undefined,
  axiosInstance: AxiosInstance = sessionStorageApi(),
  queryOptions?: Omit<
    UseInfiniteQueryOptions<InfiniteData<T>>,
    'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
  >,
): UseAxiosQueryWithPageResult<T> {
  return useInfiniteQuery({
    queryKey: keys,
    queryFn: async ({ pageParam }: QueryFunctionContext) =>
      axiosInstance({
        ...axiosOptions,
        params: { ...axiosOptions.params, page: pageParam },
      }).then((res) => res.data),
    initialPageParam: '0',
    getNextPageParam: getNextPageParam as GetNextPageParamFunction<unknown>,
    ...(queryOptions || {}),
  });
}

export type UseAxiosMutationResult<T, U> = UseMutationResult<T, Error, U, unknown>;
export function useAxiosMutation<T, U>(
  axiosOptions: AxiosRequestConfig,
  axiosInstance: AxiosInstance = sessionStorageApi(),
  refetchQueryKeys?: string[][],
  urlFn?: (body: U) => string,
  mutationOptions?: Omit<UseMutationOptions<T, Error, U>, 'mutationFn'>,
): UseAxiosMutationResult<T, U> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: U): Promise<T> =>
      axiosInstance({
        ...axiosOptions,
        data: body,
        url: urlFn ? urlFn(body) : axiosOptions.url,
      }).then((res) => {
        if (refetchQueryKeys) {
          refetchQueryKeys.forEach((key) => {
            queryClient.invalidateQueries({
              queryKey: key,
            });
          });
        }
        return res.data;
      }),
    ...(mutationOptions || {}),
  });
}

type URL = {
  id: number;
  name: string;
  url: string;
};

export const URLS: URL[] = [
  ...(process.env.REACT_APP_RUN_MSW
    ? [
        {
          id: 0,
          name: 'MSW',
          url: 'http://dummy.api',
        },
      ]
    : []),
  {
    id: 1,
    name: '이풍헌',
    url: 'https://do-free.duckdns.org/canyos',
  },
  {
    id: 2,
    name: '정지민',
    url: 'https://do-free.duckdns.org/stopmin',
  },
  {
    id: 3,
    name: '김건호',
    url: 'https://do-free.duckdns.org/amm0124',
  },
  {
    id: 4,
    name: '정진택',
    url: 'https://do-free.duckdns.org/jjt4515',
  },
];
