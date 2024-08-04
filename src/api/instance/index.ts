import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { backend } from '@/config/backendConfig';

const initInstance = () => {
  const apiUrl = localStorage.getItem('apiUrl') || backend.backend3;

  const instance = axios.create({
    baseURL: apiUrl,
    timeout: 5000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
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
