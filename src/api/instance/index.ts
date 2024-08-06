import { QueryClient } from '@tanstack/react-query';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

//import { authTokenStorage } from '@/utils/storage';

const initInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 5000,
    ...config,
    headers: {
      Accept: 'application/json',
      ...config.headers,
    },
  });

  // instance.interceptors.request.use(
  //   (reqconfig) => {
  //     const token = authTokenStorage.get();
  //     console.log(token);
  //     if (token) {
  //       reqconfig.headers.Authorization = `Bearer ${token}`;
  //     }
  //     return reqconfig;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   },
  // );

  return instance;
};

export const getBaseUrl = (): string => {
  const selectedServer = sessionStorage.getItem('selectedServer');
  switch (selectedServer) {
    case 'server1':
      return 'http://localhost:3000';
    //return 'http://bgmsound.kro.kr:8080';
    case 'server2':
      return 'http://api.server2.example.com';
    case 'server3':
      return 'http://api.server3.example.com';
    case 'server4':
      return 'http://api.server4.example.com';
    default:
      return 'http://api.example.com';
  }
};

export const BASE_URL = 'http://localhost:3000'; // api확정시 수정

export let fetchInstance = initInstance({
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

export const updateFetchInstance = () => {
  fetchInstance = initInstance({
    baseURL: getBaseUrl(),
  });
};
