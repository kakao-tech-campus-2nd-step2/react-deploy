import { useParams } from "react-router-dom";

import { CategoryHeroSection } from "@/components/features/Category/CategoryHeroSection";
import { CategoryProductsSection } from "@/components/features/Category/CategoryProductsSection";

export const CategoryPage = () => {
  const { categoryId = "" } = useParams<{ categoryId: string }>();

  return (
    <>
      <CategoryHeroSection categoryId={categoryId} />
      <CategoryProductsSection categoryId={categoryId} />
    </>
  );
};
