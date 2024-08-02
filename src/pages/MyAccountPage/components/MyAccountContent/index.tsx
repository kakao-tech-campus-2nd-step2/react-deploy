import { Link } from 'react-router-dom';

import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

import { useLogout } from '@/pages/MyAccountPage/hooks/useLogout';
import { ROUTER_PATH } from '@/routes/path';

import { Button as GrayButton } from '@/components/ui/Button';
import { Container } from '@/components/ui/Layout/Container';

import { buttonStyle, countainerStyle, titleStyle } from './styles';

export const MyAccountConent = ({ userName }: { userName: string }) => {
  const { handleLogout } = useLogout();

  return (
    <Container
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="3rem"
      css={countainerStyle}
    >
      <h1 css={titleStyle}>{userName}님 안녕하세요!</h1>
      <Container justifyContent="center" gap="1rem">
        <GrayButton
          size="medium"
          theme="darkGray"
          width="14rem"
          onClick={handleLogout}
          css={buttonStyle}
        >
          로그아웃
        </GrayButton>
        <Link to={ROUTER_PATH.ORDER_LIST}>
          <Button variant="outline" gap="0.5rem">
            <ExternalLinkIcon />
            주문 내역
          </Button>
        </Link>
      </Container>
    </Container>
  );
};
