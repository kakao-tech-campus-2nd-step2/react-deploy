import axios from 'axios';

import { apiSessionStorage } from '@/utils/storage';

const externalApi = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

const VERCEL_API_URL = 'https://react-gift-mock-api-jasper200207.vercel.app';

const vercelApi = axios.create({
  baseURL: VERCEL_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const vercelApiWithAuth = (token: string) => {
  return axios.create({
    baseURL: VERCEL_API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
};

const sessionStorageApi = () => {
  return axios.create({
    baseURL: apiSessionStorage.get(),
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiSessionStorage.get(),
    },
  });
};

const sessionStorageApiWithAuth = (token: string) => {
  return axios.create({
    baseURL: apiSessionStorage.get(),
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
};

export {
  externalApi,
  sessionStorageApi,
  sessionStorageApiWithAuth,
  VERCEL_API_URL,
  vercelApi,
  vercelApiWithAuth,
};
