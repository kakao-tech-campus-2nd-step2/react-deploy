import { useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { kakaoLogin } from '@/api/services/auth/kakao-login';
import { useAuth } from '@/provider/auth/useAuth';
import { ROUTER_PATH } from '@/routes/path';
import { authLocalStorage } from '@/utils/storage';

import { UpDownDots } from '@/components/Loading/UpDownDots';
import { OneTextContainer } from '@/components/OneTextContainer';

type RedirectSectionProps = {
  code: string;
};

export const RedirectSection = ({ code }: RedirectSectionProps) => {
  const navigate = useNavigate();
  const { data, status, error } = useQuery({
    queryKey: ['kakao', 'login', code],
    queryFn: () => kakaoLogin({ code }),
  });
  const { updateAuthInfo } = useAuth();

  if (error) {
    return <OneTextContainer>{error.message}</OneTextContainer>;
  }

  if (status === 'pending') {
    return <UpDownDots />;
  }

  if (data) {
    authLocalStorage.set(data);
    updateAuthInfo(data);
    navigate(ROUTER_PATH.HOME);
  }

  return <UpDownDots />;
};
