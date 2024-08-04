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

  instance.interceptors.request.use((config) => {
    const token = authSessionStorage.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

const apiServers = [
  { name: '지연우', url: 'http://43.201.112.200:8080' },
  { name: '김보민', url: 'http://3.36.59.196:8080' },
  { name: '박규현', url: 'http://3.35.176.195:8080' },
  { name: '정호성', url: 'http://13.125.10.230:8080' },
  { name: '조설빈', url: 'http://3.38.190.84:8080' },
];

export let BASE_URL = apiServers[0].url;

export const createFetchInstance = (baseURL: string): AxiosInstance => {
  return initInstance({
    baseURL,
  });
};

export let fetchInstance = createFetchInstance(BASE_URL);


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
export const changeServerUrl = (serverName: string) => {
  const server = apiServers.find((s) => s.name === serverName);
  if (server) {
    BASE_URL = server.url;
    fetchInstance = createFetchInstance(server.url);
  }
};

export { apiServers };

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetchInstance.get('/api/categories');
    
    if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data.categories) {
      return response.data.categories;
    } else {
      console.error('Unexpected response format:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

type Category = {
  id: number;
  name: string;
  color: string;
  imageUrl: string;
  description: string | null;
};