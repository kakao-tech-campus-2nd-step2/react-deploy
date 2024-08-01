import { Button, Center, VStack } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { useDeleteProduct } from '@/api/hooks/useDeleteProduct';
import type { ProductDetailRequestParams } from '@/api/hooks/useGetProductDetail';
import { AsyncBoundary } from '@/components/common/AsyncBoundary';
import { SplitLayout } from '@/components/common/layouts/SplitLayout';
import { LoadingView } from '@/components/common/View/LoadingView';
import { GoodsDetail } from '@/components/features/Goods/Detail';
import { OptionSection } from '@/components/features/Goods/Detail/OptionSection';

export const GoodsDetailPage = () => {
  const { productId = '' } = useParams<ProductDetailRequestParams>();
  const navigate = useNavigate();
  const { mutate: deleteProduct } = useDeleteProduct();

  const handleEditProductClick = () => {
    navigate(`/products/edit/${productId}`);
  };

  const handleAddProductClick = () => {
    navigate(`/products/add`);
  };

  const handleDeleteProductClick = () => {
    if (window.confirm('정말로 이 상품을 삭제하시겠습니까?')) {
      deleteProduct(productId);
    }
  };

  return (
    <>
      <AsyncBoundary pendingFallback={<LoadingView />} rejectedFallback={<div>에러 페이지</div>}>
        <SplitLayout sidebar={<OptionSection productId={productId} />}>
          <GoodsDetail productId={productId} />
          <Center mt={4}>
            <VStack spacing={4}>
              <Button colorScheme="blue" onClick={handleEditProductClick}>
                상품 수정
              </Button>
              <Button colorScheme="green" onClick={handleAddProductClick}>
                상품 추가
              </Button>
              <Button colorScheme="red" onClick={handleDeleteProductClick}>
                상품 삭제
              </Button>
            </VStack>
          </Center>
        </SplitLayout>
      </AsyncBoundary>
    </>
  );
};
