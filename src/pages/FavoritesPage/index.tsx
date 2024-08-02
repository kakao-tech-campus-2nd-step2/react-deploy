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
  useToast,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query'; // 추가된 부분
import type { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import type { WishItem } from '@/api/hooks/fetchWishList';
import { useRemoveWish, useWishList } from '@/api/hooks/fetchWishList';
import { useAuth } from '@/provider/Auth';

const FavoritesPage = () => {
  const authInfo = useAuth();
  const queryClient = useQueryClient(); // 추가된 부분
  const [page, setPage] = useState(0);
  const { data, error: fetchError, isLoading } = useWishList(page);
  const removeWish = useRemoveWish();
  const [wishList, setWishList] = useState<WishItem[]>([]);
  const toast = useToast();

  useEffect(() => {
    if (data) {
      setWishList(data.content);
    }
  }, [data]);

  const handleRemoveFavorite = (wishId: number) => {
    removeWish.mutate(wishId, {
      onSuccess: () => {
        setWishList((prevList) => prevList.filter((item) => item.id !== wishId));
        toast({
          title: '성공',
          description: '상품이 관심 목록에서 삭제되었습니다.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      },
      onError: (err: Error) => {
        const axiosError = err as AxiosError;
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
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['wishList'] });
      },
    });
  };

  const handleNextPage = () => {
    if (data && page < data.page.totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  if (!authInfo) {
    return <Text>로그인이 필요합니다.</Text>;
  }

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (fetchError) {
    content = <Text>오류가 발생했습니다.</Text>;
  } else {
    content = (
      <>
        <List spacing={3}>
          {wishList.map((item) => (
            <ListItem key={item.id} p={4} borderWidth="1px" borderRadius="lg">
              <Flex align="center">
                <Image boxSize="100px" src={item.imageUrl} alt={item.name} mr={4} />
                <Box flex="1">
                  <Text fontSize="lg" fontWeight="bold">
                    {item.name}
                  </Text>
                  <Text>{item.price}원</Text>
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
          <Button onClick={handleNextPage} disabled={data && page >= data.page.totalPages - 1}>
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
