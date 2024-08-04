import { useMemo } from "react";

import { getCurrentCategory } from "@/components/features/Category/CategoryHeroSection";
import { useGetProducts } from "@/api/hooks/useGetProducts";

type Props = { categoryId: string };

export const useCurrentCategory = ({ categoryId }: Props) => {
  const { data, isLoading, isError } = useGetProducts({ categoryId });

  const isRender = useMemo(() => {
    if (isLoading || isError) return false;
    if (!data || !Array.isArray(data)) return false;
    return true;
  }, [data, isLoading, isError]);

  const currentTheme = useMemo(() => {
    if (!data || !Array.isArray(data)) return null;
    return getCurrentCategory(categoryId, data);
  }, [categoryId, data]);

  return {
    isRender,
    currentTheme,
  };
};
