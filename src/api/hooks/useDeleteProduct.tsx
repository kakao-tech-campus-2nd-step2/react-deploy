import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { fetchInstance } from '../instance';

interface ErrorResponse {
  message: string;
}

const deleteProduct = async (productId: string): Promise<void> => {
  await fetchInstance.delete(`/api/products/${productId}`);
};

export const useDeleteProduct = () => {
  return useMutation<void, AxiosError<ErrorResponse>, string>({
    mutationFn: (productId) => deleteProduct(productId),
    onSuccess: () => {
      alert('상품 삭제 성공!');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      alert(`상품 삭제 실패: ${error.response?.data?.message || error.message}`);
    },
  });
};
