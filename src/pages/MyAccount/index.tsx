import { Box, Button, Image, Stack, Text, useToast } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';

import { BASE_URL } from '@/api/instance'; 
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

interface Wish {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}

export const MyAccountPage = () => {
  const authInfo = useAuth();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const toast = useToast();

  const fetchWishes = useCallback(async () => {
    if (!authInfo?.token) {
      toast({
        title: '인증 오류',
        description: '로그인이 필요합니다.',
        status: 'warning',
      });
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/wishes?page=0&size=10&sort=name,asc`, {
        headers: {
          Authorization: `Bearer ${authInfo.token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setWishes(data.content);
      } else {
        toast({
          title: '위시리스트 가져오기 오류',
          description: data.error || '오류가 발생했습니다.',
          status: 'error',
        });
      }
    } catch (error) {
      console.error('네트워크 오류:', error);
      toast({
        title: '네트워크 오류',
        description: '위시리스트를 가져오는 동안 문제가 발생했습니다.',
        status: 'error',
      });
    }
  }, [authInfo?.token, toast]);

  useEffect(() => {
    if (authInfo?.token) {
      fetchWishes();
    }
  }, [authInfo?.token, fetchWishes]);

  const handleRemoveWish = async (wishId: number) => {
    if (!authInfo?.token) {
      toast({
        title: '인증 오류',
        description: '로그인이 필요합니다.',
        status: 'warning',
      });
      return;
    }

    try {
      console.log('Removing wish with ID:', wishId);

      const response = await fetch(`${BASE_URL}/api/wishes/${wishId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authInfo.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setWishes((prevWishes) => prevWishes.filter((wish) => wish.id !== wishId));
        toast({ title: '위시리스트에서 삭제됨', status: 'success' });
      } else {
        const errorData = await response.json();
        console.error('Error removing wish:', errorData); 
        toast({ title: '위시리스트 삭제 오류', description: errorData.message || '오류가 발생했습니다.', status: 'error' });
      }
    } catch (error) {
      console.error('네트워크 오류:', error);
      toast({
        title: '네트워크 오류',
        description: '위시리스트 항목을 삭제하는 동안 문제가 발생했습니다.',
        status: 'error',
      });
    }
  };

  const handleLogout = () => {
    authSessionStorage.set('');
    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  return (
    <Wrapper>
      <Text fontSize="2xl">{authInfo?.name}님, 안녕하세요!</Text>
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
      <Box height="64px" />
      <Stack spacing={4} mt={4}>
        {wishes.map((wish) => (
          <Box key={wish.id} p={5} shadow="md" borderWidth="1px">
            <Text fontWeight="bold">{wish.product.name}</Text>
            <Image src={wish.product.imageUrl} alt={wish.product.name} />
            <Text>{wish.product.price} 원</Text>
            <Button onClick={() => handleRemoveWish(wish.id)}>삭제</Button>
          </Box>
        ))}
      </Stack>
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
