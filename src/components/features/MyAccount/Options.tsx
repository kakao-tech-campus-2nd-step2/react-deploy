import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import type { ProductDetailRequestParams } from '@/api/types';

export const Options = ({ productId }: ProductDetailRequestParams) => {
  const { data } = useGetProductDetail({ productId });

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="6">
        <Stack spacing="3">
          <Heading size="md">{data.name}</Heading>
          <Text fontSize="xl" color="blue.600">
            {data.price}원
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};
