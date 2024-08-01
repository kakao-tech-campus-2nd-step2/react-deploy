import { useParams } from 'react-router-dom';

import type { ProductDetailRequestParams } from '@/api/hooks/useGetProductDetail';
import { AsyncBoundary } from '@/components/common/AsyncBoundary';
import { SplitLayout } from '@/components/common/layouts/SplitLayout';
import { LoadingView } from '@/components/common/View/LoadingView';
import { GoodsDetail } from '@/components/features/Goods/Detail';
import { OptionSection } from '@/components/features/Goods/Detail/OptionSection';

export const GoodsDetailPage = () => {
  const { product_id = '' } = useParams<ProductDetailRequestParams>();

  return (
    <>
      <AsyncBoundary pendingFallback={<LoadingView />} rejectedFallback={<div>에러 페이지</div>}>
        <SplitLayout sidebar={<OptionSection product_id={product_id} />}>
          <GoodsDetail product_id={product_id} />
        </SplitLayout>
      </AsyncBoundary>
    </>
  );
};