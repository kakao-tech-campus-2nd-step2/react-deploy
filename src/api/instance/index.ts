import { QueryClient } from '@tanstack/react-query';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { authSessionStorage } from '@/utils/storage';

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

export let BASE_URL = 'http://3.36.86.203:8080';

export const updateBaseURL = (newBaseURL: string) => {
  BASE_URL = newBaseURL;
  fetchInstance.defaults.baseURL = BASE_URL;
  console.log(`Base URL updated to: ${BASE_URL}`);
  localStorage.setItem('baseURL', BASE_URL);
};

export const fetchInstance = initInstance({
  baseURL: BASE_URL,
});

const storedBaseURL = localStorage.getItem('baseURL');
if (storedBaseURL) {
  BASE_URL = storedBaseURL;
  fetchInstance.defaults.baseURL = BASE_URL;
}

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
