import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Box, Button, Container, HStack, IconButton } from '@chakra-ui/react';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { Fragment } from 'react';

import { queryClient } from '@/api/instance';
import { deleteFromWishlist, getWishlist } from '@/api/utils';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useSlideIndex } from '@/hooks/useSlideIndex';

export interface WishlistItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}

const page = 0;
const size = 10;

export const Wishlist = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['wishlist', page, size],
    queryFn: () => getWishlist(page, size),
  });
  const { currentIndex, handlePrev, handleNext } = useSlideIndex(data.contents.length);

  const deleteMutation = useMutation<void, Error, number>({
    mutationFn: deleteFromWishlist,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['wishlist', page, size] });
    },
    onError: () => {
      alert('관심 물품 삭제에 실패했습니다.');
    },
  });

  const handleDelete = (productId: number) => async () => {
    deleteMutation.mutateAsync(productId).then(() => alert('관심 물품 삭제에 성공했습니다.'));
  };

  return (
    <Container maxW="container.lg" minW="container.lg" py={8} borderRadius="md" boxShadow="sm">
      <Spacing height={4} />
      <HStack justify="space-between" w="100%">
        <IconButton
          aria-label="Previous"
          icon={<ArrowLeftIcon />}
          onClick={handlePrev}
          isDisabled={currentIndex === 0}
        />
        <HStack w="100%" spacing={4} height="calc(400px + 64px)">
          {data.contents.slice(currentIndex, currentIndex + 4).map((item: WishlistItem) => (
            <Fragment key={item.id}>
              <Box
                borderRadius="md"
                border="1px"
                borderColor="gray.200"
                p={4}
                maxW="200px"
                minW="200px"
                minH="400px"
                maxH="400px"
                bg="#fefefe"
                boxShadow="sm"
                mx={2}
                display="flex"
                flexDirection="column"
                alignItems="space-between"
              >
                <DefaultGoodsItems
                  imageSrc={item.product.imageUrl}
                  subtitle={item.product.name}
                  title={item.product.name}
                  amount={item.product.price}
                />
                <Button
                  colorScheme="red"
                  mt="auto"
                  width="40px"
                  ml="auto"
                  mr="auto"
                  onClick={handleDelete(item.product.id)}
                >
                  삭제
                </Button>
                <Spacing height={4} />
              </Box>
            </Fragment>
          ))}
        </HStack>
        <IconButton
          aria-label="Next"
          icon={<ArrowRightIcon />}
          onClick={handleNext}
          isDisabled={currentIndex >= data.contents.length - 4}
        />
      </HStack>
    </Container>
  );
};
