import styled from '@emotion/styled';

import { useGetPoints } from '@/api/hooks/useGetPoints';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { Wishlist } from '@/components/features/Wishlist';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

export const MyAccountPage = () => {
  const authInfo = useAuth();
  const points = useGetPoints();

  const handleLogout = () => {
    authSessionStorage.set(undefined);
    sessionStorage.removeItem('authEmail');

    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  return (
    <Wrapper>
      {authInfo?.name}님 안녕하세요! <Spacing height={50} />
      <Text>보유 포인트 : {points}p</Text>
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
      <Spacing height={64} />
      <WishlistWrapper>
        <Wishlist />
      </WishlistWrapper>
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

const WishlistWrapper = styled.div`
  width: 100%;
  padding: 80px;
`;

const Text = styled.div`
  font-size: 25px;
  font-weight: 600;
  padding: 20px;
`;
