import { Navigate, useParams } from 'react-router-dom';

import { useGetCategories } from '@/api/hooks/useGetCategorys';
import { CategoryHeroSection } from '@/components/features/Category/CategoryHeroSection';
import { CategoryProductsSection } from '@/components/features/Category/CategoryProductsSection';
import { useCurrentCategory } from '@/hooks/useCurrentCategory';
import { RouterPath } from '@/routes/path';

export const CategoryPage = () => {
  const { categoryId = '' } = useParams<{ categoryId: string }>();
  const { isRender, currentTheme } = useCurrentCategory({ categoryId });
  const { data: categories, isLoading, error } = useGetCategories();

  if (!isRender) return null;

  if (!currentTheme) {
    return <Navigate to={RouterPath.notFound} />;
  }

  return (
    <>
      <CategoryHeroSection categoryId={categoryId} />
      <CategoryProductsSection categoryId={categoryId} />
      {isLoading && <p>Loading categories...</p>}
      {error && <p>Error loading categories: {error.message}</p>}
      {categories && (
        <ul>
          {categories.map(category => (
            <li key={category.id}>
              <img src={category.imageUrl} alt={category.name} />
              <p>{category.name}</p>
              <p>{category.color}</p>
              <p>{category.description}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
