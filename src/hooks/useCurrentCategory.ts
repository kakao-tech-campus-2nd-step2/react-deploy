import { useMemo } from 'react';

import { useGetCategories } from '@/api/hooks/useGetCategorys';
import { getCurrentCategory } from '@/components/features/Category/CategoryHeroSection';

type Props = { categoryId: string };

export const useCurrentCategory = ({ categoryId }: Props) => {
  const { data, isLoading, isError } = useGetCategories();

  const isRender = useMemo(() => {
    return !isLoading && !isError && data !== undefined;
  }, [data, isLoading, isError]);

  const currentCategory = useMemo(
    () => getCurrentCategory(categoryId, data ?? []),
    [categoryId, data],
  );

  return {
    isRender,
    currentCategory,
  };
};
