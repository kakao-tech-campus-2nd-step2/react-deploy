import { QueryClient } from '@tanstack/react-query';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { authSessionStorage, serverTypeSessionStorage } from '@/utils/storage';

export const BASE_URL = {
  mock: 'https://mock.example.com',
  안재영: 'https://안재영.example.com',
  유보민: 'https://유보민.example.com',
  서지우: 'https://서지우.example.com',
  강명덕: 'https://강명덕.example.com',
} as const;

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

const serverType: keyof typeof BASE_URL = serverTypeSessionStorage.get() || 'mock';

const baseURL = BASE_URL[serverType];

export const fetchInstance = initInstance({
  baseURL,
});

const token = authSessionStorage.get();
export const fetchWithToken = initInstance({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
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
