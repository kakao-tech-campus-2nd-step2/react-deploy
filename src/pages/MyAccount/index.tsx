import {
  Box,
  Button,
  Heading,
  Image,
  List,
  ListItem,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';

import { useDeleteWishlistItem } from '@/api/hooks/useDeleteWish';
import { useGetWishlist } from '@/api/hooks/useGetWish';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

export const MyAccountPage = () => {
  const authInfo = useAuth();
  const {
    data: wishlistData,
    isLoading,
    refetch,
  } = useGetWishlist({
    page: 0,
    size: 10,
    sort: 'createdDate,desc',
  });

  const deleteWishlistItem = useDeleteWishlistItem();

  const handleLogout = () => {
    authSessionStorage.set(undefined);
    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  const handleDelete = (id: number) => {
    deleteWishlistItem.mutate(id, {
      onSuccess: () => {
        alert('관심 목록에서 삭제되었습니다.');
        refetch(); // 삭제 후 위시리스트를 새로고침
      },
      onError: () => {
        alert('관심 목록에서 삭제하는 중 오류가 발생했습니다.');
      },
    });
  };

  if (isLoading) {
    return (
      <Box textAlign="center" paddingTop="100px">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <VStack spacing="20px" paddingY="80px">
      <Text fontSize="36px" fontWeight="700">
        {authInfo?.name}님 안녕하세요!
      </Text>
      <Box>
        <Heading as="h2" size="lg">
          Wishlist
        </Heading>
        <List spacing={5}>
          {wishlistData?.content.map((item) => (
            <ListItem
              key={item.id}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center">
                {item.product.name} - ${item.product.price.toFixed(2)}
                <Image
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  boxSize="100px"
                  marginLeft="10px"
                />
              </Box>
              <Button colorScheme="red" size="sm" onClick={() => handleDelete(item.id)}>
                삭제
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
      <Button size="sm" colorScheme="gray" maxWidth="200px" onClick={handleLogout}>
        로그아웃
      </Button>
    </VStack>
  );
};
