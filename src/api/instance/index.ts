import { QueryClient } from '@tanstack/react-query';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { authSessionStorage } from '@/utils/storage';

const initInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 5000,
    ...config,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cross-Control-Allow-Origin': '*',
      ...config.headers,
    },
  });

  return instance;
};

export let BASE_URL = process.env.REACT_APP_API_JANG!;

export const fetchInstance = initInstance({
  baseURL: BASE_URL,
});

fetchInstance.interceptors.request.use((config) => {
  const token = authSessionStorage.get();
  if (token) {
    // TODO: Bearer 부분 제거해야함
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const setFetchInstanceBaseURL = (url: string) => {
  fetchInstance.defaults.baseURL = url;
  BASE_URL = url;
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
