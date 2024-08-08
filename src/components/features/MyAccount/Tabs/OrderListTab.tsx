import { Container } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import useGetOrders from '@/api/hooks/useGetOrders';
import ListMapper from '@/components/common/ListMapper';
import Loading from '@/components/common/Loading';
import type { OrderLog } from '@/components/features/MyAccount/OrderLogCard';
import OrderLogCard from '@/components/features/MyAccount/OrderLogCard';

const OrderListTab = () => {
  const { ref, inView } = useInView();

  const { data, isLoading, isError, hasNextPage, fetchNextPage } = useGetOrders({});
  const flattenOrderList = data?.pages.map((page) => page?.contents || []).flat();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <Container>
      <Loading isLoading={isLoading} error={isError}>
        <ListMapper<OrderLog> items={flattenOrderList} ItemComponent={OrderLogCard} />
        <div ref={ref} />
      </Loading>
    </Container>
  );
};

export default OrderListTab;
