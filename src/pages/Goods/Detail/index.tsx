import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

import {
  type ProductDetailRequestParams,
  useGetProductDetail,
} from '@/api/hooks/useGetProductDetail';
import { AsyncBoundary } from '@/components/common/AsyncBoundary';
import { SplitLayout } from '@/components/common/layouts/SplitLayout';
import { LoadingView } from '@/components/common/View/LoadingView';
import { GoodsDetail } from '@/components/features/Goods/Detail';
import { OptionSection } from '@/components/features/Goods/Detail/OptionSection';

export const GoodsDetailPage = () => {
  const { productId = '' } = useParams<ProductDetailRequestParams>();
  // console.log('productId: ', productId);

  const { data, isLoading, isError } = useGetProductDetail({ productId });

  if (isLoading || isError) return null;
  if (!data) return null;

  return (
    <Suspense fallback={<LoadingView />}>
      <AsyncBoundary pendingFallback={<LoadingView />} rejectedFallback={<div>에러 페이지</div>}>
        <SplitLayout sidebar={<OptionSection productId={productId} />}>
          <GoodsDetail productId={productId} />
        </SplitLayout>
      </AsyncBoundary>
    </Suspense>
  );
};
