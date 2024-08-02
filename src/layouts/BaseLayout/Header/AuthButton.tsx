import { Link } from 'react-router-dom';

import { Button } from '@chakra-ui/react';

import { useAuth } from '@/provider/auth/useAuth';
import { ROUTER_PATH } from '@/routes/path';

export const AuthButton = () => {
  const { authInfo } = useAuth();

  return (
    <Link to={authInfo ? ROUTER_PATH.MY_ACCOUNT : ROUTER_PATH.LOGIN}>
      <Button variant="ghost">{authInfo ? '내 계정' : '로그인'}</Button>
    </Link>
  );
};
