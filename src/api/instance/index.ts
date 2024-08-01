import { QueryClient } from '@tanstack/react-query';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

const BASE_URL_KIM = process.env.REACT_APP_BASE_URL_KIM;
const BASE_URL_PARK = process.env.REACT_APP_BASE_URL_PARK;
const BASE_URL_AHN = process.env.REACT_APP_BASE_URL_AHN;
const BASE_URL_LEE = process.env.REACT_APP_BASE_URL_LEE;

const apiOption = localStorage.getItem('apiOption') || '김은선';

export const BASE_URL =
  apiOption === '김은선'
    ? BASE_URL_KIM
    : apiOption === '박준석'
      ? BASE_URL_PARK
      : apiOption === '안재민'
        ? BASE_URL_AHN
        : apiOption === '이도훈'
          ? BASE_URL_LEE
          : BASE_URL_KIM;

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

export const fetchInstance = initInstance({
  baseURL: BASE_URL,
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
