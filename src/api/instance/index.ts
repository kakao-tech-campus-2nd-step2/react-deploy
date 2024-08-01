import { QueryClient } from '@tanstack/react-query';
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

import { serverStorage } from '@/utils/storage';

export const BASE_URLS = {
  mock: 'https://mock.example.com',
  강명덕: 'https://api.example.com',
  서지우: 'http://43.203.40.120:8080',
  안재영: 'https://api.example.com',
  유보민: 'http://52.78.56.132:8080',
} as const;

type ServerKey = keyof typeof BASE_URLS;

const getBaseUrl = (): string => {
  const selectedServer = (serverStorage.get() as ServerKey) || 'mock';
  return BASE_URLS[selectedServer];
};

export const BASE_URL = getBaseUrl();

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

export let fetchInstance = initInstance({
  baseURL: getBaseUrl(),
});

export const resetFetchInstance = () => {
  fetchInstance = initInstance({
    baseURL: getBaseUrl(),
  });
};

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
