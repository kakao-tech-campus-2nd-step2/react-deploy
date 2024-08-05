import { QueryClient } from '@tanstack/react-query';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { authSessionStorage } from '@/utils/storage';

const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:3000';

const initInstance = (axiosConfig: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    ...axiosConfig,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...axiosConfig.headers,
    },
  });

  instance.interceptors.request.use((requestConfig) => {
    const token = authSessionStorage.get();
    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }
    return requestConfig;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('Error fetching data:', error);
      return Promise.reject(error);
    },
  );

  return instance;
};

export const fetchInstance = initInstance({});

// BASE_URL 내보내기
export const BASE_URL = API_URL;

export const setBaseURL = (url: string) => {
  fetchInstance.defaults.baseURL = url;
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
