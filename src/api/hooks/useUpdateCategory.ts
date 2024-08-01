import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { fetchInstance } from '../instance';

interface UpdateCategoryRequest {
  name: string;
  color: string;
  imageUrl: string;
  description: string;
}

interface ErrorResponse {
    message: string;
  }
  
  const updateCategory = async (categoryId: string, category: UpdateCategoryRequest): Promise<void> => {
    console.log(`Making PUT request to /api/categories/${categoryId} with data:`, category); // 로그 추가
    await fetchInstance.put(`/api/categories/${categoryId}`, category);
  };
  
  export const useUpdateCategory = () => {
    return useMutation<void, AxiosError<ErrorResponse>, { categoryId: string; category: UpdateCategoryRequest }>({
      mutationFn: ({ categoryId, category }) => updateCategory(categoryId, category),
      onSuccess: () => {
        alert('카테고리 수정 성공!');
      },
      onError: (error: AxiosError<ErrorResponse>) => {
        alert(`카테고리 수정 실패: ${error.response?.data?.message || error.message}`);
      },
    });
  };