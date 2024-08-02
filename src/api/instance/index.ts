import { QueryClient } from "@tanstack/react-query";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";

const initInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 5000,
    ...config,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...config.headers,
    },
  });

  return instance;
};

type URL = {
  id: number;
  name: string;
  url: string;
};

export const URLS: URL[] = [
  {
    id: 1,
    name: "심규민",
    url: "http://15.165.67.223:8080",
  },
  {
    id: 2,
    name: "박한솔",
    url: `http://203.234.206.181:8080`,
  },
];

// Context 로 전역 관리하기 (완료) + axiosfetchInstances 함수 변경 필요 (동적으로 전역관리된 url을 사용해야 함)
export const BASE_URL = "http://15.165.67.223:8080";
export const fetchInstance = initInstance({
  baseURL: "http://15.165.67.223:8080",
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
