import axios from 'axios';
import { useEffect, useState } from 'react';

import { useBaseURL } from '@/provider/Auth/BaseUrlContext';
import type { CategoryData } from '@/types';

export type CategoryResponseData = CategoryData[];

export const useGetCategories = () => {
  const { baseURL } = useBaseURL();
  const [categories, setCategories] = useState<CategoryResponseData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<{ categories: CategoryData[] }>(`${baseURL}/api/categories`);
        setCategories(response.data.categories);
      } catch (err) {
        let errorMessage = 'An unexpected error occurred';
        if (axios.isAxiosError(err) && err.response) {
          errorMessage = (err.response.data.detail as string) || 'Failed to fetch categories';
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [baseURL]);

  return { categories, loading, error };
};
