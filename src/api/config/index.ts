import { AxiosError } from 'axios';

import { API_ERROR_MESSAGES } from '@/constants/errorMessage';
import { authLocalStorage } from '@/utils/storage';

import { getErrorMessage } from './errorHandler';
import { initInstance } from './instance';

export const BACKEND_API = initInstance({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

BACKEND_API.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const customError = new Error(getErrorMessage(error));
    return Promise.reject(customError);
  }
);

export const AUTHROIZATION_API = initInstance({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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
    const customError = new Error(getErrorMessage(error));

    if (error instanceof AxiosError) {
      const { response } = error;

      if (response?.status === 401) {
        throw new Error(API_ERROR_MESSAGES.AUTH_ERROR);
      }
    }

    return Promise.reject(customError);
  }
);
