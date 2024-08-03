import { QueryClient } from '@tanstack/react-query';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { useEffect,useState } from 'react';

const initInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 50000,
    ...config,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...config.headers,
    },
  });

  return instance;
};

export const BASE_URL = "http://54.211.59.4:8080";
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


export const useSelectApi = () => {
  const [selectedApi, setSelectedApi] = useState(BASE_URL);
  const [axiosInstance, setAxiosInstance] = useState(() => initInstance({ baseURL: selectedApi }));

  useEffect(() => {
    setAxiosInstance(initInstance({ baseURL: selectedApi }));
  }, [selectedApi]);

  return { axiosInstance, selectedApi, setSelectedApi };
};

