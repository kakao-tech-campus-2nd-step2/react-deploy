import { Navigate, useParams } from 'react-router-dom';

import { CategoryHeroSection } from '@/components/features/Category/CategoryHeroSection';
import { CategoryProductsSection } from '@/components/features/Category/CategoryProductsSection';
import { useCurrentCategory } from '@/hooks/useCurrentCategory';
import { RouterPath } from '@/routes/path';

export const CategoryPage = () => {
  const { category_id = '' } = useParams<{ category_id: string }>();
  const categoryIdNumber = Number(category_id);
  const { isRender, currentTheme } = useCurrentCategory({ category_id });

  if (!isRender) return null;

  if (!currentTheme) {
    return <Navigate to={RouterPath.notFound} />;
  }

  return (
    <>
      <CategoryHeroSection category_id={category_id} />
      <CategoryProductsSection category_id={categoryIdNumber} />
    </>
  );
};
