import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { fetchInstance } from '../instance';

interface AddCategoryRequest {
  name: string;
  color: string;
  imageUrl: string;
  description: string;
}

interface ErrorResponse {
  message: string;
}

const addCategory = async (category: AddCategoryRequest): Promise<void> => {
  await fetchInstance.post('/api/categories', category);
};

export const useAddCategory = (): UseMutationResult<void, AxiosError<ErrorResponse>, AddCategoryRequest> => {
  return useMutation<void, AxiosError<ErrorResponse>, AddCategoryRequest>({
    mutationFn: addCategory,
    onSuccess: () => {
      alert('카테고리 추가 성공!');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      alert(`카테고리 추가 실패: ${error.response?.data?.message || error.message}`);
    },
  });
};
