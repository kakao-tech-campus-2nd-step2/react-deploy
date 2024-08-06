import { Container } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';

import ListMapper from '@/components/common/ListMapper';
import Loading from '@/components/common/Loading';
import type { OrderLog } from '@/components/features/MyAccount/OrderLogCard';
import OrderLogCard from '@/components/features/MyAccount/OrderLogCard';

const OrderListTab = () => {
  const { ref } = useInView();

  return (
    <Container>
      <Loading isLoading={false} error={false}>
        <ListMapper<OrderLog>
          items={[
            {
              imageUrl: 'https://via.placeholder.com/150',
              name: '상품명',
              count: 12,
              price: 10000,
            },
          ]}
          ItemComponent={OrderLogCard}
          wrapperProps={{
            columns: {
              initial: 2,
              md: 4,
            },
            gap: 16,
          }}
        />
        <div ref={ref} />
      </Loading>
    </Container>
  );
};

export default OrderListTab;
