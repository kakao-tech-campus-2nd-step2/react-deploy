import { QueryClient } from "@tanstack/react-query";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";

import { authSessionStorage, currentApi } from "@/utils/storage";

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

  instance.interceptors.request.use(
    (requestConfig) => {
      const token = authSessionStorage.get();
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: token,
        };
      }
      return requestConfig;
    },
    (error) => Promise.reject(error),
  );

  return instance;
};

export const fetchInstance = initInstance({
  baseURL: "http://15.165.67.223:8080",
});

export const BASE_URL = currentApi.get() ?? "http://15.165.67.223:8080";

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
