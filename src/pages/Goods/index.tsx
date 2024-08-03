import { Navigate,useParams } from 'react-router-dom';

import { GoodsDetail } from '@/components/features/Goods/Detail';

export const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();

  if (!productId) {
    // productId가 undefined인 경우 처리
    return <Navigate to="/error" />; // 에러 페이지로 리디렉션하거나 다른 적절한 처리를 합니다.
  }

  return (
    <div>
      <GoodsDetail productId={productId} />
    </div>
  );
};
