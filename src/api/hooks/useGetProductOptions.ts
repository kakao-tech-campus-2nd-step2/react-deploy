import { useQuery } from '@tanstack/react-query';
import type { AxiosInstance } from 'axios';
import axios from 'axios';

import { BASE_URL } from '../instance'; 

export const fetchWithTokenInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

export type ProductOption = {
  id: number;
  name: string;
  quantity: number;
};

export const getProductOptionsPath = (productId: string) =>
  `${BASE_URL}/api/products/${productId}/options`;

export const getProductOptions = async (productId: string): Promise<ProductOption[]> => {
  const response = await fetchWithTokenInstance().get<ProductOption[]>(getProductOptionsPath(productId));
  return response.data;
};

export const useGetProductOptions = (productId: string) => {
  return useQuery<ProductOption[], Error>({
    queryKey: ['productOptions', productId],
    queryFn: () => getProductOptions(productId),
  });
};
