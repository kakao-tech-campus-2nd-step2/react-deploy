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
export const BASE_URL = 'http://localhost:3000';

// 엔지니어별 API URL
export const apiUrls: Record<string, string> = {
  안승환: 'http://backend1.example.com',
  오승규: 'http://43.201.15.245:8080',
  이세진: 'http://3.34.142.38:8080',
  조준환: 'http://backend4.example.com',
};

export const fetchInstance = initInstance({
  baseURL: 'http://localhost:3000',
});

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
