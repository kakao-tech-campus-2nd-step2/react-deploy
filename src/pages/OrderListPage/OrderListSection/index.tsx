import { Container } from '@/components/ui/Layout/Container';

import { OrderItem } from './OrderItem';

export const OrderListSection = () => {
  return (
    <Container flexDirection="column" gap="2rem">
      <OrderItem />
    </Container>
  );
};
