import { Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BaseLayout from '@/layouts/BaseLayout';
import { ROUTER_PATH } from '@/routes/path';

import { UpDownDots } from '@/components/Loading/UpDownDots';

import { ProductSection } from './components/ProductSection';

export const ProductsDetailPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  if (!productId) {
    navigate(ROUTER_PATH.HOME);
    return null;
  }

  return (
    <BaseLayout>
      <Suspense fallback={<UpDownDots />}>
        <ProductSection productId={Number(productId)} />
      </Suspense>
    </BaseLayout>
  );
};
