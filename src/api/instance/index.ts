import { QueryClient } from '@tanstack/react-query';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { authSessionStorage } from '@/utils/storage';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
// 서버 API 주소
//export const BASE_URL = 'http://43.201.17.220:8080';
// 다른 서버 주소
// // 명준
// http://13.125.199.167:8080 준형
//'http://3.38.211.225:8080' 서영

const initInstance = (axiosConfig: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 5000,
    ...axiosConfig,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...axiosConfig.headers,
    },
  });

  // 인증 토큰 설정
  instance.interceptors.request.use((requestConfig) => {
    const token = authSessionStorage.get(); // sessionStorage에서 토큰 가져오기
    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }
    return requestConfig;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('Error fetching data:', error);
      return Promise.reject(error);
    },
  );

  return instance;
};

// 기본 서버 API 주소 설정
export const fetchInstance = initInstance({
  baseURL: API_URL,
});

export const setBaseURL = (url: string) => {
  fetchInstance.defaults.baseURL = url;
};

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
