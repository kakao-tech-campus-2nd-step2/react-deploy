import { authSessionStorage } from '@/utils/storage';

import { QueryClient } from '@tanstack/react-query';

import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

export const initInstance = (config: AxiosRequestConfig): AxiosInstance => {
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

const DO_URL = process.env.REACT_APP_DO_URL;
const KIM_URL = process.env.REACT_APP_KIM_URL;
const HAN_URL = process.env.REACT_APP_HAN_URL;

const getBaseURL = () => {
  const selectedValue = sessionStorage.getItem('selectedValue');
  switch (selectedValue) {
    case 'dog':
      return DO_URL;
    case 'cat':
      return KIM_URL;
    case 'hamster':
      return HAN_URL;
    default:
      return 'https://api.example.com';
  }
};

export const BASE_URL = getBaseURL();
// TODO: 추후 서버 API 주소 변경 필요
export const fetchInstance = initInstance({
  baseURL: getBaseURL(),
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

const initFetchWithTokenInstance = () => {
  const instance = initInstance({
    baseURL: BASE_URL,
  });

  instance.interceptors.request.use((config) => {
    const token = authSessionStorage.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

export const fetchWithTokenInstance = initFetchWithTokenInstance();
