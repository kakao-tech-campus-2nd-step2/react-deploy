import BaseLayout from '@/layouts/BaseLayout';

import { OrderForm } from './components/OrderForm';
import { useOrderHistory } from './hooks/useOrderHistory';

export const OrderPage = () => {
  const { orderHistory } = useOrderHistory();

  return (
    <BaseLayout>
      <OrderForm orderHistory={orderHistory} />
    </BaseLayout>
  );
};
