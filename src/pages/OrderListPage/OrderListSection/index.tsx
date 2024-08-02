import { useOrderList } from '@/api/hooks/useOrderList';

import { Container } from '@/components/ui/Layout/Container';

import { OrderItem } from './OrderItem';

export const OrderListSection = () => {
  const { orderList } = useOrderList({});

  return (
    <Container
      flexDirection="column"
      gap="2rem"
      css={{ paddingBottom: '6rem' }}
    >
      {orderList?.map((order) => (
        <OrderItem key={order.orderId} orderDetail={order} />
      ))}
    </Container>
  );
};
