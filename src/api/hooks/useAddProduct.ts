// src/api/hooks/useAddProduct.ts

import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { fetchInstance } from '../instance';

interface AddProductRequest {
  name: string;
  price: number;
  imageUrl: string;
  categoryId: number;
}

interface ErrorResponse {
  message: string;
}

const addProduct = async (product: AddProductRequest): Promise<void> => {
  await fetchInstance.post('/api/products', product);
};

export const useAddProduct = () => {
  return useMutation<void, AxiosError<ErrorResponse>, AddProductRequest>({
    mutationFn: addProduct,
    onSuccess: () => {
      alert('상품 추가 성공!');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      alert(`상품 추가 실패: ${error.response?.data?.message || error.message}`);
    },
  });
};
