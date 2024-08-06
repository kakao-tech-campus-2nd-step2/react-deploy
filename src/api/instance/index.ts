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

const getBaseURL = (environment: string): string => {
  switch (environment) {
    case '김은선':
      return 'http://15.165.235.250:8000';
    case '박준석':
      return 'https://13.125.130.222:8080';
    case '안재민':
      return 'http://43.202.41.179:8080';
    case '이도훈':
      return 'http://52.79.161.58:8080';
    default:
      return 'https://api.example.com';
  }
};

let BASE_URL1 = getBaseURL(localStorage.getItem('environment') || 'MSW');
let fetchInstance1 = initInstance({ baseURL: BASE_URL1 });

export const getCurrentBaseURL = () => BASE_URL1;
export const getCurrentFetchInstance = () => fetchInstance1;

export const updateBaseURL = (environment: string) => {
  BASE_URL1 = getBaseURL(environment);
  fetchInstance1 = initInstance({ baseURL: BASE_URL1 });
  console.log('Updated BASE_URL:', BASE_URL1);
  queryClient.invalidateQueries();
};

export const BASE_URL = 'http://localhost';
export const fetchInstance = initInstance({ baseURL: BASE_URL });

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
