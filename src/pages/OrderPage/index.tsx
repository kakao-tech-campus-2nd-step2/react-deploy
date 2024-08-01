import { Suspense } from 'react';

import BaseLayout from '@/layouts/BaseLayout';

import { UpDownDots } from '@/components/Loading/UpDownDots';

import { OrderForm } from './components/OrderForm';
import { useOrderHistory } from './hooks/useOrderHistory';

export const OrderPage = () => {
  const { orderHistory } = useOrderHistory();

  return (
    <BaseLayout>
      <Suspense fallback={<UpDownDots />}>
        <OrderForm orderHistory={orderHistory} />
      </Suspense>
    </BaseLayout>
  );
};
