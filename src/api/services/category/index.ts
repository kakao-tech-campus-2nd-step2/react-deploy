import { BACKEND_API } from '@/api/config';
import { API_ERROR_MESSAGES } from '@/constants/errorMessage';
import { CategoryData } from '@/types/categoryType';

type CategoryResponse = {
  categories: CategoryData[];
};

export const fetchCategories = async () => {
  try {
    const response = await BACKEND_API.get<CategoryResponse>('/api/categories');

    return response.data.categories;
  } catch (error) {
    throw new Error(API_ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};
