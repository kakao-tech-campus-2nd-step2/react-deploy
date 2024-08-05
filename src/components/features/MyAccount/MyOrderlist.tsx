import { Box, Button, Divider, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { getMockOrderList, type Order } from '@/api/hooks/myOrderlist.mock';

export const MyOrderlist = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(3);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchOrders(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const fetchOrders = (page: number, size: number) => {
    const response = getMockOrderList(page, size);
    setOrders(response.resultData);
    setTotalPages(response.pages);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Box p={8}>
      <Heading mb={6}>주문 목록</Heading>
      <Divider mb={6} />
      {orders.length === 0 ? (
        <p>주문 목록이 없습니다.</p>
      ) : (
        <>
          {orders.map((order) => (
            <Box
              key={order.userId}
              borderWidth="1px"
              borderRadius="md"
              p={4}
              mb={12}
              boxShadow="sm"
              display="flex"
              alignItems="center"
              gap={4}
              width="800px"
              height="115px"
              bg="white"
              borderColor="gray.200"
            >
              {/* 미구현 => MockData 출력 */}
              <Image
                src={`https://via.placeholder.com/85?text=Image`}
                alt={`User ${order.userId}`}
                boxSize="85px"
                objectFit="cover"
              />
              <Box flex="1" p={2}>
                <Text fontSize="lg" fontWeight="bold">
                  User ID: {order.userId}
                </Text>
                <Text fontSize="md" color="gray.600">
                  옵션 ID: {order.optionId}
                </Text>
                <Text fontSize="md" color="gray.600">
                  수량: {order.quantity}
                </Text>
              </Box>
            </Box>
          ))}
        </>
      )}
      <Flex mt={6} justifyContent="space-between" alignItems="center">
        <Button onClick={handlePreviousPage} disabled={currentPage === 0} colorScheme="gray">
          이전
        </Button>
        <Text>
          {currentPage + 1} / {totalPages} 페이지
        </Text>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          colorScheme="gray"
        >
          다음
        </Button>
      </Flex>
    </Box>
  );
};
