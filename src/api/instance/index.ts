import { QueryClient } from '@tanstack/react-query';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

const initInstance = (baseURL: string, config?: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 5000,
    ...config,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...config?.headers,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-shadow
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (
      token &&
      !config.url?.includes('/api/categories') &&
      !config.url?.includes('/api/products')
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

export const fetchInstance = (baseURL: string, config?: AxiosRequestConfig): AxiosInstance => {
  return initInstance(baseURL, config);
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
