import { Box, Button, Text, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { usePoint } from '@/api/hooks/usePoint';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authTokenStorage } from '@/utils/storage';

import WishList from './WishList';

export const MyAccountPage = () => {
  const authInfo = useAuth();
  const { data: point, isLoading: pointLoading, isError: pointError } = usePoint();

  const handleLogout = () => {
    authTokenStorage.set(undefined);
    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  return (
    <Wrapper>
      <VStack spacing={8}>
        <Box>{authInfo?.name}님 안녕하세요!</Box>
        <Spacing height={64} />
        {pointLoading ? (
          <Text>포인트 로딩 중...</Text>
        ) : pointError ? (
          <Text>포인트를 가져오는데 실패했습니다.</Text>
        ) : (
          <Text>현재 포인트: {point} 점</Text>
        )}
        <Button size="small" onClick={handleLogout} style={{ maxWidth: '200px' }}>
          로그아웃
        </Button>
        <WishList />
      </VStack>
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
