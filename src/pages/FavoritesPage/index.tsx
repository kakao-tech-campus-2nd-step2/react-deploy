import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  List,
  ListItem,
  Spinner,
  Text,
<<<<<<< HEAD
  useToast,
} from '@chakra-ui/react';
import type { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import type { WishItem } from '@/api/hooks/fetchWishList';
import { useRemoveWish, useWishList } from '@/api/hooks/fetchWishList';

const FavoritesPage = () => {
  const [page, setPage] = useState(0);
  const { data, error, isLoading } = useWishList(page);
  const removeWish = useRemoveWish();
  const [wishList, setWishList] = useState<WishItem[]>([]);
  const toast = useToast();
=======
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { useRemoveWish, useWishList } from '@/api/hooks/fetchWishList';
import { useAuth } from '@/provider/Auth';

const FavoritesPage = () => {
  const authInfo = useAuth();
  const [page, setPage] = useState(0);
  const { data, error, isLoading } = useWishList(page);
  const removeWish = useRemoveWish();
  const [wishList, setWishList] = useState(data?.content || []);
>>>>>>> upstream/hehelee

  useEffect(() => {
    if (data) {
      setWishList(data.content);
    }
  }, [data]);

<<<<<<< HEAD
  const handleRemoveFavorite = (productId: number) => {
    removeWish.mutate(
      { productId },
      {
        onSuccess: () => {
          setWishList((prevList) => prevList.filter((item) => item.id !== productId));
          toast({
            title: '성공',
            description: '상품이 관심 목록에서 삭제되었습니다.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        },
        onError: (axiosError: AxiosError) => {
          const message =
            (axiosError.response?.data as { message: string })?.message || axiosError.message;
          toast({
            title: '오류',
            description: `상품 삭제 중 오류가 발생했습니다: ${message}`,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        },
      },
    );
  };

  const handleNextPage = () => {
    if (data && page < data.page.totalPages - 1) {
=======
  const handleRemoveFavorite = (id: number) => {
    removeWish.mutate(id, {
      onSuccess: () => {
        setWishList((prevList) => prevList.filter((item) => item.id !== id));
      },
    });
  };

  const handleNextPage = () => {
    if (data && page < data.totalPages - 1) {
>>>>>>> upstream/hehelee
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

<<<<<<< HEAD
=======
  if (!authInfo) {
    return <Text>로그인이 필요합니다.</Text>;
  }

>>>>>>> upstream/hehelee
  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (error) {
    content = <Text>오류가 발생했습니다.</Text>;
  } else {
    content = (
      <>
        <List spacing={3}>
          {wishList.map((item) => (
            <ListItem key={item.id} p={4} borderWidth="1px" borderRadius="lg">
              <Flex align="center">
<<<<<<< HEAD
                <Image boxSize="100px" src={item.imageUrl} alt={item.name} mr={4} />
                <Box flex="1">
                  <Text fontSize="lg" fontWeight="bold">
                    {item.name}
                  </Text>
                  <Text>{item.price}원</Text>
=======
                <Image boxSize="100px" src={item.product.imageUrl} alt={item.product.name} mr={4} />
                <Box flex="1">
                  <Text fontSize="lg" fontWeight="bold">
                    {item.product.name}
                  </Text>
                  <Text>{item.product.price}원</Text>
>>>>>>> upstream/hehelee
                </Box>
                <IconButton
                  icon={<CloseIcon />}
                  aria-label="Remove from favorites"
                  variant="outline"
                  colorScheme="red"
                  onClick={() => handleRemoveFavorite(item.id)}
                />
              </Flex>
            </ListItem>
          ))}
        </List>
        <Flex justify="space-between" mt={4}>
          <Button onClick={handlePreviousPage} disabled={page === 0}>
            이전
          </Button>
<<<<<<< HEAD
          <Button onClick={handleNextPage} disabled={data && page >= data.page.totalPages - 1}>
=======
          <Button onClick={handleNextPage} disabled={data && page >= data.totalPages - 1}>
>>>>>>> upstream/hehelee
            다음
          </Button>
        </Flex>
      </>
    );
  }
  return (
    <Box p={5}>
      <Text fontSize="2xl" mb={4}>
        관심 목록
      </Text>
      {content}
    </Box>
  );
};

export default FavoritesPage;
