import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { fetchInstance } from '../instance';

interface UpdateProductRequest {
  name: string;
  price: number;
  imageUrl: string;
  categoryId: number;
}

interface ErrorResponse {
  message: string;
}

const updateProduct = async (productId: string, product: UpdateProductRequest): Promise<void> => {
  await fetchInstance.put(`/api/products/${productId}`, product);
};

export const useUpdateProduct = () => {
  return useMutation<void, AxiosError<ErrorResponse>, { productId: string; product: UpdateProductRequest }>({
    mutationFn: ({ productId, product }) => updateProduct(productId, product),
    onSuccess: () => {
      alert('상품 수정 성공!');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      alert(`상품 수정 실패: ${error.response?.data?.message || error.message}`);
    },
  });
};
