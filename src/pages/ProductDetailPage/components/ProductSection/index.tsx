import { useProductDetail } from '@/api/hooks/useProductDetail';

import { Content } from '@/components/Content';
import { OneTextContainer } from '@/components/OneTextContainer';

import { ProductDetail } from './ProductDetail';
import { ProductForm } from './ProductForm';

type ProductSectionProps = {
  productId: number;
};

export const ProductSection = ({ productId }: ProductSectionProps) => {
  const { data: productDetail, error } = useProductDetail(productId);

  if (error) {
    return <OneTextContainer>{error.message}</OneTextContainer>;
  }

  return (
    <Content
      gap="2rem"
      height="92vh"
      maxWidth="1280px"
      padding="0 3rem"
      css={{ padding: '2rem 0' }}
    >
      <ProductDetail productDetail={productDetail} />
      <ProductForm productId={Number(productId)} price={productDetail.price} />
    </Content>
  );
};
