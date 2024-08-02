import { QueryClient } from '@tanstack/react-query';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

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

export const getBaseUrl = (): string => {
  const selectedServer = sessionStorage.getItem('selevtedServer');
  switch (selectedServer) {
    case 'server1':
      return 'http://api.server1.example.com';
    case 'server2':
      return 'http://api.server2.example.com';
    case 'server3':
      return 'http://api.server3.example.com';
    case 'server4':
      return 'http://api.server4.example.com';
    default:
      return 'http://api.example.com';
  }
};

export const BASE_URL = getBaseUrl();

export let fetchInstance = initInstance({
  baseURL: getBaseUrl(),
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

export const updateFetchInstance = () => {
  fetchInstance = initInstance({
    baseURL: getBaseUrl(),
  });
};
