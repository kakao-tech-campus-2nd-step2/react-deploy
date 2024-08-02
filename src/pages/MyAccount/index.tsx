import { Box, Button, HStack, Image, Text, useBreakpointValue, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { useAuth } from '@/provider/Auth';
import { useBackend } from '@/provider/Auth/Backend';
import { breakpoints } from '@/styles/variants';
import { authSessionStorage } from '@/utils/storage';

interface WishlistItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}

export const MyAccount = () => {
  const authInfo = useAuth();
  const { backendUrl } = useBackend();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (authInfo) {
        setLoading(true);
        try {
          const response = await axios.get(
            `${backendUrl}/api/wishes?page=0&size=10&sort=createdDate,desc`,
            {
              headers: {
                Authorization: `Bearer ${authInfo.token}`,
              },
            },
          );
          setWishlist(response.data.content);
        } catch (err) {
          console.error('Failed to fetch wishlist:', err);
          setError('Failed to fetch wishlist');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchWishlist();
  }, [authInfo, backendUrl]);

  const handleRemoveFromWishlist = async (productId: number) => {
    if (!authInfo) {
      console.error('User is not authenticated');
      return;
    }

    try {
      const response = await axios.delete(`${backendUrl}/api/wishes/${productId}`, {
        headers: {
          Authorization: `Bearer ${authInfo.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setWishlist((prev) => prev.filter((item) => item.product.id !== productId));
        alert('관심 상품이 삭제되었습니다.');
      } else {
        console.error('Unexpected response status:', response.status);
        alert('관심 상품 삭제에 실패했습니다.');
      }
      // eslint-disable-next-line @typescript-eslint/no-shadow
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Failed to remove from wishlist:', error.response?.data || error.message);
        alert(`관심 상품 삭제 실패: ${error.response?.data?.message || error.message}`);
      } else {
        console.error('Failed to remove from wishlist:', error);
        alert('관심 상품 삭제 실패');
      }
    }
  };

  const maxWidth = useBreakpointValue({ base: '100%', sm: '600px' });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Wrapper>
      <Box mb={4} textAlign="center">
        <Text fontSize="2xl" fontWeight="bold">
          관심 상품 목록
        </Text>
      </Box>
      <VStack spacing={4} align="stretch" maxWidth={maxWidth} margin="0 auto">
        {wishlist.map((item) => (
          <HStack
            key={item.id}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            align="center"
            spacing={4}
            width="100%"
          >
            <Image
              src={item.product.imageUrl}
              alt={item.product.name}
              boxSize="100px"
              objectFit="cover"
            />
            <Box flex="1">
              <Text fontSize="lg" fontWeight="bold">
                {item.product.name}
              </Text>
              <Text>{item.product.price}원</Text>
            </Box>
            <Button colorScheme="red" onClick={() => handleRemoveFromWishlist(item.product.id)}>
              삭제
            </Button>
          </HStack>
        ))}
      </VStack>
      <Box textAlign="center" mt={8}>
        <Button
          onClick={() => {
            authSessionStorage.set(undefined);
            window.location.reload();
          }}
          colorScheme="yellow"
          size="lg"
        >
          로그아웃
        </Button>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  width: 100%;
  padding: 16px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 32px;
  }
`;
