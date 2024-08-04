import { QueryClient } from '@tanstack/react-query';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { apiSessionStorage, authSessionStorage } from '@/utils/storage';

const initInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 5000,
    ...config,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...config.headers,
    },
  });

  return instance;
};
const baseURL = apiSessionStorage.get() || process.env.REACT_APP_API_URL_KSR;
export const BASE_URL = baseURL;
// TODO: 추후 서버 API 주소 변경 필요
export const fetchInstance = initInstance({
  baseURL: baseURL,
});

export const fetchAuthInstance = initInstance({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${authSessionStorage.get()?.token}`,
  },
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
  },
});
