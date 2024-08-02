import { Button, Center, useToast, VStack } from '@chakra-ui/react';
import type { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { useAddWish, useRemoveWish } from '@/api/hooks/fetchWishList';
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
  const toast = useToast();
  const { mutate: deleteProduct } = useDeleteProduct();
  const { mutate: addWish } = useAddWish({
    onSuccess: () => {
      toast({
        title: '성공',
        description: '관심 상품에 추가되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ message: string }>;
      toast({
        title: '오류',
        description: `관심 상품 추가 중 오류가 발생했습니다: ${axiosError.response?.data?.message || axiosError.message}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });
  const { mutate: removeWish } = useRemoveWish({
    onSuccess: () => {
      toast({
        title: '성공',
        description: '관심 상품에서 제거되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ message: string }>;
      toast({
        title: '오류',
        description: `관심 상품 제거 중 오류가 발생했습니다: ${axiosError.response?.data?.message || axiosError.message}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

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

  const handleAddWishClick = () => {
    addWish({ productId: parseInt(productId, 10) });
  };

  const handleRemoveWishClick = () => {
    removeWish({ productId: parseInt(productId, 10) });
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
              <Button colorScheme="yellow" onClick={handleAddWishClick}>
                관심 상품 추가
              </Button>
              <Button colorScheme="purple" onClick={handleRemoveWishClick}>
                관심 상품 삭제
              </Button>
            </VStack>
          </Center>
        </SplitLayout>
      </AsyncBoundary>
    </>
  );
};
