import axios from 'axios';

import { apiSessionStorage } from '@/utils/storage';

const externalApi = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

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
      Authorization: 'Bearer ' + token,
    },
  });
};

export { externalApi, sessionStorageApi, sessionStorageApiWithAuth };
