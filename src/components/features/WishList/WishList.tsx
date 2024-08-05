import { Button, HStack, Image, Spinner, Text, VStack } from '@chakra-ui/react';
import React from 'react';

import { useDeleteWish } from '@/api/hooks/useDeleteWish';
import type { WishListItem } from '@/api/hooks/useGetWishList';
import { useGetWishList } from '@/api/hooks/useGetWishList';

export const WishList = () => {
  const [page] = React.useState(0);
  const { data, isLoading, isError, error } = useGetWishList(page, 10);
  const { mutate: deleteWish } = useDeleteWish();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Text color="red.500">관심 목록을 불러오는 데 실패했습니다: {error.message}</Text>;
  }

  if (!data) {
    return <Text>위시 리스트가 비어 있습니다.</Text>;
  }

  const handleDelete = (wishId: number) => {
    deleteWish(wishId);
  };

  return (
    <VStack spacing={4} width="100%" maxWidth="600px">
      <Text fontSize="2xl" fontWeight="bold">
        관심 목록
      </Text>
      {data?.map((item: WishListItem) => (
        <HStack key={item.id} spacing={4} p={4} borderWidth="1px" borderRadius="md" width="100%">
          <Image src={item.product.imageUrl} alt={item.product.name} boxSize="80px" />
          <VStack align="start">
            <Text fontWeight="bold">{item.product.name}</Text>
            <Text>{item.product.price}원</Text>
          </VStack>
          <Button colorScheme="red" onClick={() => handleDelete(item.id)}>
            삭제
          </Button>
        </HStack>
      ))}
    </VStack>
  );
};
