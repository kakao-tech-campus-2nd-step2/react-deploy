import { AxiosError } from 'axios';

import { API_ERROR_MESSAGES } from '@/constants/errorMessage';
import { Api } from '@/layouts/BaseLayout/Header/SelectAPI';
import { apiLocalStorage, authLocalStorage } from '@/utils/storage';

import { initInstance } from './instance';

const BASE_URL = import.meta.env.VITE_API_KDW;

const config = {
  KDW: import.meta.env.VITE_API_KDW,
  YSO: import.meta.env.VITE_API_YSO,
  SHJ: import.meta.env.VITE_API_SHJ,
  KG: import.meta.env.VITE_API_KG,
};
const currentAPI: Api = apiLocalStorage.get();

export const BACKEND_API = initInstance({
  baseURL: currentAPI ? config[currentAPI] : BASE_URL,
});

export const AUTHROIZATION_API = initInstance({
  baseURL: currentAPI ? config[currentAPI] : BASE_URL,
  withCredentials: true,
});

AUTHROIZATION_API.interceptors.request.use(
  (request) => {
    const authInfo = authLocalStorage.get();

    if (authInfo) {
      request.headers.Authorization = `Bearer ${authInfo.accessToken}`;
    }

    return request;
  },
  (error) => {
    if (error instanceof AxiosError) {
      const { response } = error;

      if (response?.status === 401) {
        throw new Error(API_ERROR_MESSAGES.AUTH_ERROR);
      }
    }

    return Promise.reject(error);
  }
);
