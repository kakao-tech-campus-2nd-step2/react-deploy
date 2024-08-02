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

<<<<<<< HEAD
  const currentTheme = useMemo(() => getCurrentCategory(categoryId, data ?? []), [categoryId, data]);
=======
  const currentTheme = getCurrentCategory(categoryId, data ?? []);
>>>>>>> upstream/hehelee

  return {
    isRender,
    currentTheme,
  };
};
