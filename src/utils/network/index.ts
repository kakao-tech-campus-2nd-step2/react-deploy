import axios, { isAxiosError } from 'axios';
import { currentUrlStorage, tokenStorage } from '@utils/storage';
import { AuthenticatedRequestURLs } from '@constants/RequestURLs';
import { StatusCodes } from 'http-status-codes';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: currentUrlStorage.get() || BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const { url } = config;

  if (!url || !(url in AuthenticatedRequestURLs)) {
    return config;
  }

  const token = tokenStorage.get();

  if (!token) { // token validation 추가해야됨
    return Promise.reject(new Error('토큰이 정의되지 않았습니다.'));
  }

  config.headers.setAuthorization(`Bearer ${token}`);

  return config;
});

axiosInstance.interceptors.response.use(
  (config) => (config),
  (error) => {
    if (!isAxiosError(error)) return error;

    if (error.response?.status === StatusCodes.UNAUTHORIZED) {
      window.location.href = '/login';
    }

    return error;
  },
);

type RequestPath = { [key: string]: string };

export function replacePathParams(url: string, pathParams: RequestPath): string {
  let replacedUrl = url;
  Object.entries(pathParams).forEach(([key, value]) => {
    replacedUrl = replacedUrl.replace(`:${key}`, value.toString());
  });

  return replacedUrl;
}

export function isNotFound(error: Error | null) {
  return error && axios.isAxiosError(error) && error.response?.status === StatusCodes.NOT_FOUND;
}
