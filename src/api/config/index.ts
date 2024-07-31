import { AxiosError } from 'axios';

import { API_ERROR_MESSAGES } from '@/constants/errorMessage';
import { authLocalStorage } from '@/utils/storage';

import { initInstance } from './instance';

export const BACKEND_API = initInstance({});

export const AUTHROIZATION_API = initInstance({
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
