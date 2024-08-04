import { Box, Button, Image, Stack, Text, useToast } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { useEffect } from 'react';
import { usePoint } from '@/api/hooks/usePoint';
import { useRemoveFromWishlist, useWishlist } from '@/api/hooks/useWishList';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';

export const MyAccountPage = () => {
  const { authInfo, logout } = useAuth();
  const { wishlist, loading, fetchError, fetchWishlist } = useWishlist();
  const { removeFromWishlist, loading: removeLoading, removeError } = useRemoveFromWishlist(fetchWishlist);
  const { point, loading: pointLoading} = usePoint();
  const toast = useToast();

  useEffect(() => {
    if (!authInfo) {
      window.location.replace(`${window.location.origin}${RouterPath.login}`);
    }
  }, [authInfo]);

  useEffect(() => {
    if (fetchError) {
      toast({
        title: '위시리스트 가져오기 오류',
        description: fetchError,
        status: 'error',
      });
    }
  }, [fetchError, toast]);

  const handleRemove = async (wishId: number) => {
    try {
      await removeFromWishlist(wishId);
      toast({ title: '위시리스트에서 삭제됨', status: 'success' });
    } catch (error) {
      console.error('관심 상품 삭제 실패', error);
      toast({ title: '위시리스트 삭제 오류', description: removeError, status: 'error' });
    }
  };

  const handleLogout = () => {
    logout();
    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  return (
    <Wrapper>
      <Text fontSize="2xl">{authInfo?.name}님, 안녕하세요!</Text>
      <Box mt={4} mb={4}>
        {pointLoading ? (
          <Text fontSize="xl">포인트 로딩 중...</Text>
        ) : (
          <Text fontSize="xl">현재 포인트: {point} 점</Text>
        )}
      </Box>
      <Box height="64px" />
      <Button
        size="sm"
        variant="outline"
        colorScheme="gray"
        onClick={handleLogout}
        style={{ maxWidth: '200px' }}
      >
        로그아웃
      </Button>
      <Box mt={40}>
        <Text fontSize="2xl" mb={4}>관심 목록</Text>
        {loading ? (
          <Text fontSize="xl">로딩 중...</Text>
        ) : (
          <Stack spacing={4} mt={4}>
            {wishlist.map((wish) => (
              <Box key={wish.id} p={5} shadow="md" borderWidth="1px">
                <Text fontWeight="bold">{wish.product.name}</Text>
                <Image src={wish.product.imageUrl} alt={wish.product.name} />
                <Text>{wish.product.price} 원</Text>
                <Button onClick={() => handleRemove(wish.id)} isLoading={removeLoading}>
                  삭제
                </Button>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 80px 0 120px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 36px;
`;
