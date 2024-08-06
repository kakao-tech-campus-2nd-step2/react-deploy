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

  // `contents` 배열을 추출하여 전달
  const currentTheme = getCurrentCategory(categoryId, data ?? []);

  return {
    isRender,
    currentTheme,
  };
};
