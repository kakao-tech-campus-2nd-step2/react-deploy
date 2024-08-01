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

// 기본 API URL
export const BASE_URL = 'https://api.example.com';

// 엔지니어별 API URL
export const apiUrls: Record<string, string> = {
  안승환: '',
  오승규: '',
  이세진: '',
  조준환: ''
};

export const createFetchInstance = (engineer: string): AxiosInstance => {
  const baseURL = apiUrls[engineer] || BASE_URL; 
  return initInstance({ baseURL });
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
