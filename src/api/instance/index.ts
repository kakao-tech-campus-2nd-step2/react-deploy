import { QueryClient } from '@tanstack/react-query';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { servers } from '../constants';

const SESSION_STORAGE_KEY = 'selectedServer';

let axiosInstance: AxiosInstance | null = null;
let currentBaseURL =
  servers[sessionStorage.getItem(SESSION_STORAGE_KEY)!] || Object.values(servers)[0];

const initInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    baseURL: 'http://43.203.255.125',
    timeout: 5000,
    ...config,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...config.headers,
    },
    withCredentials: true,
  });

  console.log(currentBaseURL);
  // 동혁님용 인터셉터 추가
  instance.interceptors.request.use(
    (request) => {
      // 특정 도메인에 대해서만 Authorization 헤더 추가
      if (request.url && request.url.startsWith('http://43.203.225.165:8080')) {
        // const token = localStorage.getItem('authToken');
        const token =
          'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZW1haWwiOiJrYWthbzFAa2FrYW8uY29tIiwic29jaWFsVG9rZW4iOiIiLCJzb2NpYWxUeXBlIjoiT1RIRVIiLCJpYXQiOjE3MjI2OTI1MjQsImV4cCI6MTcyMjY5NjEyNH0.hI4TL12yG-Q_9V_RjIqAA_atRiUivR_vMk8NmIcs3FE';
        if (token) {
          request.headers.Authorization = `Bearer ${token}`;
        }
      }
      return request;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return instance;
};

export const setBaseURL = (baseURL: string) => {
  currentBaseURL = baseURL;
  axiosInstance = initInstance({ baseURL });
};

export const getInstance = (): AxiosInstance => {
  if (!axiosInstance) {
    setBaseURL(currentBaseURL);
  }
  return axiosInstance!;
};

export const getBaseURL = () => currentBaseURL;
export const fetchInstance = getInstance();

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
