import { useMemo } from 'react';

import { useGetCategories } from '@/api/hooks/useGetCategorys';
import { getCurrentCategory } from '@/components/features/Category/CategoryHeroSection';

type Props = { categoryId: string };

export const useCurrentCategory = ({ categoryId }: Props) => {
  const { data, isLoading, isError } = useGetCategories();

  const isRender = useMemo(() => {
    if (isLoading || isError) return false;
    if (!data || !Array.isArray(data.categories)) return false;
    return true;
  }, [data, isLoading, isError]);

  const currentTheme = useMemo(() => {
    if (!data || !Array.isArray(data.categories)) return null;
    return getCurrentCategory(categoryId, data.categories);
  }, [categoryId, data]);

  return {
    isRender,
    currentTheme,
  };
};
