import { QueryClient } from '@tanstack/react-query';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { getBackendAPI } from '../apiPath';

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
export const BASE_URL = getBackendAPI();
export const fetchInstance = initInstance({
  baseURL: BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': `http://localhost:3000`,
    'Access-Control-Allow-Credentials': 'true',
  },
});

export const fetchInstanceWithAuth = (token?: string) =>
  initInstance({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': `http://localhost:3000`,
      'Access-Control-Allow-Credentials': 'true',
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
