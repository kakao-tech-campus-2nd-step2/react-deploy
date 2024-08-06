import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';
import { Container, VStack, Box, CloseButton, Text } from '@chakra-ui/react';
import { getWishList, removeWish } from '@/api/wish';

type WishItem = {
  id: number;
  product: {
    productId: number;
    name: string;
    image_url: string;
    price: number;
  };
};

export const MyAccountPage = () => {
  const authInfo = useAuth();
  const [wishList, setWishList] = useState<WishItem[]>([]);

  useEffect(() => {
    const fetchWishList = async () => {
      try {
        const data = await getWishList();
        setWishList(data);
      } catch (error) {
        console.error('Error fetching wish list:', error);
      }
    };

    fetchWishList();
  }, []);

  const handleLogout = () => {
    authSessionStorage.set(undefined);

    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  const handleRemoveWish = async (wishId: number) => {
    try {
      const success = await removeWish(wishId);
      if (success) {
        setWishList((prev) => prev.filter((item) => item.id !== wishId));
      } else {
        alert('관심 상품 삭제 실패');
      }
    } catch (error) {
      console.error('Error removing wish item:', error);
      alert('관심 상품 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container w="100%">
      <Wrapper>
        {authInfo?.name}님 안녕하세요! <Spacing height={64} />
        <Button
          size="small"
          theme="darkGray"
          onClick={handleLogout}
          style={{
            maxWidth: '200px',
          }}
        >
          로그아웃
        </Button>
      </Wrapper>
      <VStack spacing="24px">
        <Text fontWeight="bold" fontSize="20px">
          관심 상품
        </Text>
        {wishList.length > 0 ? (
          wishList.map((wish) => (
            <StyledBox key={wish.id} alignItems="center">
              <Text>{wish.product.name}</Text>
              <CloseButton onClick={() => handleRemoveWish(wish.id)} />
            </StyledBox>
          ))
        ) : (
          <Text>관심 상품이 없습니다.</Text>
        )}
      </VStack>
    </Container>
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

const StyledBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  background-color: #fdffbc;
  width: 100%;
  padding: 16px;
`;
