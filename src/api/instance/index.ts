import { QueryClient } from '@tanstack/react-query';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { authSessionStorage, serverTypeSessionStorage } from '@/utils/storage';

export const BASE_URL_LIST = {
  mock: 'https://api.example.com/',
  강명덕: 'http://43.203.210.66:8080',
  유보민: 'http://52.78.56.132:8080',
  안재영: 'https://AN.example.com',
  서지우: 'http://43.203.40.120:8080',
} as const;

export type BaseURL = keyof typeof BASE_URL_LIST;

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

const serverType: BaseURL = serverTypeSessionStorage.get() || 'mock';

const baseURL = BASE_URL_LIST[serverType];

export const BASE_URL = BASE_URL_LIST[serverType];

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

fetchWithToken.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const errorMessage = `서버 에러 : ${error.response.status}`;
    alert(JSON.stringify(errorMessage));
    return Promise.reject(error);
  },
);

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
