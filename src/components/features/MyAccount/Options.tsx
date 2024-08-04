import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Box, Container, HStack, IconButton, Text } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Fragment } from 'react';

import { getOrderList } from '@/api/utils';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useSlideIndex } from '@/hooks/useSlideIndex';

export const Options = () => {
  const { data: orderListData } = useSuspenseQuery({
    queryFn: () => getOrderList({ page: 0, size: 10, sort: 'orderDateTime,desc' }),
    queryKey: ['orderList'],
  });
  const { currentIndex, handlePrev, handleNext } = useSlideIndex(orderListData.contents.length);

  return (
    <Container maxW="container.lg" minW="container.lg" py={8} borderRadius="md" boxShadow="sm">
      <HStack justify="space-between" w="100%">
        <IconButton
          aria-label="Previous"
          icon={<ArrowLeftIcon />}
          onClick={handlePrev}
          isDisabled={currentIndex === 0}
        />
        <HStack w="100%" spacing={4} height="calc(400px + 64px)">
          {orderListData.contents.slice(currentIndex, currentIndex + 4).map((orderData) => (
            <Fragment key={orderData.id}>
              <Box
                borderRadius="md"
                border="1px"
                borderColor="gray.200"
                p={4}
                maxW="200px"
                minW="200px"
                minH="300px"
                maxH="300px"
                bg="#fefefe"
                boxShadow="sm"
                mx={2}
                display="flex"
                flexDirection="column"
                alignItems="space-between"
              >
                <Text fontSize="14px" color="gray">
                  주문 번호 {orderData.id}
                </Text>
                <Text fontSize="14px" color="gray">
                  주문 일 {orderData.orderDateTime.split('T')[0]}
                </Text>
                <Spacing />
                <Text fontSize="20px">{`${orderData.productName} ${orderData.optionName} x ${orderData.quantity}`}</Text>
                <Spacing />
                <Text fontSize="18px" color="blue.600">
                  {orderData.productPrice * orderData.quantity} 원
                </Text>
                <Text fontSize="16px" color="darkgray">
                  {orderData.message}
                </Text>
              </Box>
            </Fragment>
          ))}
        </HStack>
        <IconButton
          aria-label="Next"
          icon={<ArrowRightIcon />}
          onClick={handleNext}
          isDisabled={currentIndex >= orderListData.contents.length - 4}
        />
      </HStack>
    </Container>
  );
};
