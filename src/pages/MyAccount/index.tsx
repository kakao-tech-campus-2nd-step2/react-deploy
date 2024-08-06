import { Box, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect } from 'react';

import { useGetPoints } from '@/api/hooks/point/point.api';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { WishList } from '@/components/features/MyAccount/WishList';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

export const MyAccountPage = () => {
  const { mutate, data, status, error } = useGetPoints();

  useEffect(() => {
    mutate();
  }, [mutate]);

  const handleLogout = () => {
    authSessionStorage.set(undefined);

    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  return (
    <Wrapper>
      <Text>개발자님 안녕하세요!</Text>
      <Spacing height={64} />
      <Box>
        <Text>포인트</Text>
        {status === 'pending' ? (
          <Text>Loading...</Text>
        ) : status === 'error' ? (
          <Text>Error fetching points: {error.message}</Text>
        ) : (
          <Text>{data?.point ?? 0}</Text>
        )}
      </Box>
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
      <WishList />
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
