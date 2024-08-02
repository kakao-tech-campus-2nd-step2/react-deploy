import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { fetchInstance } from '../instance';

interface ErrorResponse {
  message: string;
}

const deleteCategory = async (categoryId: string): Promise<void> => {
  await fetchInstance.delete(`/api/categories/${categoryId}`);
};

export const useDeleteCategory = () => {
  return useMutation<void, AxiosError<ErrorResponse>, string>({
    mutationFn: (categoryId) => deleteCategory(categoryId),
    onSuccess: () => {
      alert('카테고리 삭제 성공!');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      alert(`카테고리 삭제 실패: ${error.response?.data?.message || error.message}`);
    },
  });
};
