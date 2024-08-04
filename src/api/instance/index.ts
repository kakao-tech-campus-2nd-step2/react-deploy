import { QueryClient } from '@tanstack/react-query';
import axios, { type AxiosInstance } from 'axios';

import { apiOptionLocalStorage } from '@/utils/storage';

const BASE_URL_KIM = process.env.REACT_APP_BASE_URL_KIM;
const BASE_URL_PARK = process.env.REACT_APP_BASE_URL_PARK;
const BASE_URL_AHN = process.env.REACT_APP_BASE_URL_AHN;
const BASE_URL_LEE = process.env.REACT_APP_BASE_URL_LEE;

const apiOption = apiOptionLocalStorage.get() || '김은선';

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

console.log('BASE_URL: ', BASE_URL); // test

export const fetchInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
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
