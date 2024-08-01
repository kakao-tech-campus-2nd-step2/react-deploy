import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { useDeleteCategory } from '@/api/hooks/useDeleteCategory';
import { CategoryHeroSection } from '@/components/features/Category/CategoryHeroSection';
import { CategoryProductsSection } from '@/components/features/Category/CategoryProductsSection';
import { useCurrentCategory } from '@/hooks/useCurrentCategory';
import { RouterPath } from '@/routes/path';

export const CategoryPage = () => {
  const { categoryId = '' } = useParams<{ categoryId: string }>();
  const { isRender, currentTheme } = useCurrentCategory({ categoryId });
  const navigate = useNavigate();
  const { mutate: deleteCategory } = useDeleteCategory();

  if (!isRender) return null;

  if (!currentTheme) {
    return <Navigate to={RouterPath.notFound} />;
  }

  const handleAddCategoryClick = () => {
    navigate(RouterPath.addCategory);
  };

  const handleEditCategoryClick = () => {
    navigate(RouterPath.editCategory.replace(':categoryId', categoryId));
  };

  const handleDeleteCategoryClick = () => {
    if (window.confirm('정말로 이 카테고리를 삭제하시겠습니까?')) {
      deleteCategory(categoryId);
    }
  };

  return (
    <>
      <CategoryHeroSection categoryId={categoryId} />
      <CategoryProductsSection categoryId={categoryId} />
      <button onClick={handleAddCategoryClick}>카테고리 추가</button>
      <button onClick={handleEditCategoryClick}>카테고리 수정</button>
      <button onClick={handleDeleteCategoryClick} style={{ backgroundColor: 'red', color: 'white' }}>카테고리 삭제</button>
    </>
  );
};
