import { QueryClient } from '@tanstack/react-query';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

const getAuthToken = (): string | null => {
  return sessionStorage.getItem('authToken');
};

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

  instance.interceptors.request.use(
    config => {
      const authToken = getAuthToken();
      if (authToken) {
        config.headers['Authorization'] = `Bearer ${authToken}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export const BASE_URL = localStorage.getItem('selectedAPI') || '';

export const fetchInstance = initInstance({
  baseURL: BASE_URL,
});

export const updateInstanceBaseURL = (newBaseURL: string) => {
  fetchInstance.defaults.baseURL = newBaseURL;
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
