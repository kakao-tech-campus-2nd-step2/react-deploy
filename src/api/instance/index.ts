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

export const BASE_URL = "http://54.180.245.166:8080";
// TODO: 추후 서버 API 주소 변경 필요

export const fetchInstance = initInstance({
  baseURL: "http://54.180.245.166:8080",
});

export const updateFetchInstance = (baseUrl: string) => {
  fetchInstance.defaults.baseURL = baseUrl;
  console.log(fetchInstance.defaults.baseURL);
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
