import { Button } from '@chakra-ui/react';

import { useOrderList } from '@/api/hooks/useOrderList';

import { UpDownDots } from '@/components/Loading/UpDownDots';
import { OneTextContainer } from '@/components/OneTextContainer';
import { Container } from '@/components/ui/Layout/Container';

import { OrderItem } from './OrderItem';

export const OrderListSection = () => {
  const { orderList, status, error, fetchNextPage, hasNextPage } = useOrderList(
    {}
  );

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (error) {
    return <OneTextContainer>{error.message}</OneTextContainer>;
  }

  if (status === 'pending') {
    return <UpDownDots />;
  }

  if (!orderList?.length) {
    return <OneTextContainer>주문 목록이 없습니다.</OneTextContainer>;
  }

  return (
    <Container
      flexDirection="column"
      gap="2rem"
      css={{ paddingBottom: '6rem' }}
    >
      {orderList?.map((order) => (
        <OrderItem key={order.orderId} orderDetail={order} />
      ))}

      {hasNextPage && (
        <Button onClick={handleLoadMore} colorScheme="yellow" mt="1rem">
          더 보기
        </Button>
      )}
    </Container>
  );
};
