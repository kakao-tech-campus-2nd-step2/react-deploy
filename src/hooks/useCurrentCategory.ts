import { useMemo } from 'react';

import { useGetCategories } from '@/api/hooks/useGetCategorys';
import { getCurrentCategory } from '@/components/features/Category/CategoryHeroSection';

type Props = { categoryId: string };

export const useCurrentCategory = ({ categoryId }: Props) => {
  const { data, isLoading, isError } = useGetCategories();

  const isRender = useMemo(() => {
    if (isLoading || isError) return false;
    if (!data) return false;
    return true;
  }, [data, isLoading, isError]);

  const currentCategory = getCurrentCategory(categoryId, data ?? []);

  // const currentTheme = getCurrentCategory(categoryId, data ?? []);
  const currentTheme = currentCategory
    ? {
        id: currentCategory.id,
        name: currentCategory.name,
        backgroundColor: currentCategory.color,
        title: currentCategory.title !== undefined ? currentCategory.title : currentCategory.name,
      }
    : null;

  return {
    isRender,
    currentTheme,
  };
};
