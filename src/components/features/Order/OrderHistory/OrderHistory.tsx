import { Box, Image, Spinner, Text } from '@chakra-ui/react';

import { useGetOrders } from '@/api/hooks/useGetOrders';

export const OrderHistory = () => {
  const { data, isLoading, isError } = useGetOrders({ page: 0, size: 10, sort: 'id,desc' });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !data) {
    return <Text color="red.500">주문 내역을 불러오는 데 실패했습니다.</Text>;
  }

  if (!data.content || data.content.length <= 0)
    return <Text color="red.500">주문 내역이 없어요!</Text>;

  return (
    <Box>
      {data?.content.map((order) => (
        <Box
          key={order.id}
          display="flex"
          alignItems="center"
          p={4}
          borderWidth="1px"
          borderRadius="md"
          mb={4}
        >
          <Image boxSize="150px" src={order.imageUrl} alt={order.name} />
          <Box ml={4}>
            <Text>
              {order.name} x {order.count}개
            </Text>
            <Text>{order.price} 원</Text>
            <Text>{order.orderDateTime}</Text>
            <Text>{order.message}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
