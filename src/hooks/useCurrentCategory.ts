import { useMemo } from 'react';

import { useGetCategories } from '@/api/hooks/useGetCategorys';
import { getCurrentCategory } from '@/components/features/Category/CategoryHeroSection';

type Props = { categoryId: string };

export const useCurrentCategory = ({ categoryId }: Props) => {
  const { categories, loading, error } = useGetCategories();

  const isRender = useMemo(() => {
    if (loading || error) return false;
    if (!categories) return false;
    return true;
  }, [categories, loading, error]);

  const currentTheme = getCurrentCategory(categoryId, categories ?? []);

  return {
    isRender,
    currentTheme,
  };
};
