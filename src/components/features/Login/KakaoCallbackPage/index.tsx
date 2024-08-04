import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useKakaoCallbackMutation } from '@/api/hooks/auth/kakao-login.api';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

const KakaoCallbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuthInfo } = useAuth();
  const mutation = useKakaoCallbackMutation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');

    if (code) {
      mutation.mutate(code, {
        onSuccess: (data) => {
          if (data.token) {
            setAuthInfo({ token: data.token });
            authSessionStorage.set(data.token);
            navigate(RouterPath.home);
          } else {
            alert('로그인 실패');
          }
        },
        onError: (error) => {
          console.error('Error during Kakao login:', error);
          alert('로그인 중 오류가 발생했습니다.');
        },
      });
    }
  }, [location.search, mutation, navigate, setAuthInfo]);

  return <div>로그인 중...</div>;
};

export default KakaoCallbackPage;
