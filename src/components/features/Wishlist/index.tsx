import { Box, Button, Heading, List, ListItem, Text } from '@chakra-ui/react';
// import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useGetWishlist } from '@/api/hooks/useGetWishlist';
import { VisibilityLoader } from '@/components/common/VisibilityLoader';
import { useAuth } from '@/provider/Auth';

type WishlistItem = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export const Wishlist = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetWishlist({ maxResults: 10 });
  const authInfo = useAuth();
  // const queryClient = useQueryClient(); 
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    if (data) {
      const flattenWishlist = data.pages.flatMap((page) => page.content).flat();
      setWishlist(flattenWishlist);
    }
  }, [data]);

  const handleDelete = async (wishId: number) => {
    
    if (authInfo?.token) {
      const response = await fetch(`/api/wishes/${wishId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authInfo.token}`,
        },
      });
      if (response.status === 204) {
        setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== wishId));
      } else {
        alert('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <Box w="100%" display="flex" justifyContent="center">
      <Box p={4} maxW="1024px" w="100%">
        <Heading as="h2" fontSize="25px" mb={4}>
          관심 목록
        </Heading>
        {wishlist.length === 0 ? (
          <Text fontSize="17px">관심 상품이 없습니다.</Text>
        ) : (
          <List spacing={3}>
            {wishlist.map((item) => 
              <ListItem key={item.id} p={2} borderWidth={1} borderRadius="md">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box display="flex" alignItems="center" gap="30px">
                    <img src={item.imageUrl} alt={item.name} />
                    <Box display="flex" flexDirection="column" gap="10px">
                      <Text fontSize="20px" fontWeight={600}>
                        {item.name}
                      </Text>
                      <Text fontSize="18px">{item.price}원</Text>
                    </Box>
                  </Box>
                  <Button onClick={() => handleDelete(item.id)}>삭제</Button>
                </Box>
              </ListItem>
            )}
          </List>
        )}
        {hasNextPage && (
          <VisibilityLoader
            callback={() => {
              if (!isFetchingNextPage) {
                fetchNextPage();
              }
            }}
          />
        )}
      </Box>
    </Box>
  );
};
