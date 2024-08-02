import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

const initInstance = () => {
  const instance = axios.create({
    timeout: 5000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use((config) => {
    const apiUrl = localStorage.getItem('apiUrl') || 'https://example.com';
    config.baseURL = apiUrl;

    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  return instance;
};

export const fetchInstance = initInstance();

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
