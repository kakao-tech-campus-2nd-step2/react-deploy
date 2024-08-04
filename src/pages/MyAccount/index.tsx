import { Box, Button, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

import WishList from './WishList';

const queryClient = new QueryClient();

export const MyAccountPage = () => {
  const authInfo = useAuth();

  const handleLogout = () => {
    authSessionStorage.set(undefined);
    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Wrapper>
        <VStack spacing={8}>
          <Box>{authInfo?.name}님 안녕하세요!</Box>
          <Spacing height={64} />
          <Button size="small" onClick={handleLogout} style={{ maxWidth: '200px' }}>
            로그아웃
          </Button>
          <WishList />
        </VStack>
      </Wrapper>
    </QueryClientProvider>
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
