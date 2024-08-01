import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { BASE_URL, fetchInstance } from '@/api/instance';
import { authSessionStorage } from '@/utils/storage';

export const RedirectionPage = () => {
  const navigate = useNavigate();
  const code = new URLSearchParams(window.location.search).get('code');

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetchInstance.get(
          `${BASE_URL}/api/auth/kakao/callback?code=${code}`,
        );
        const token = response.headers.authorization;
        if (token) {
          authSessionStorage.set(token);
          alert('로그인이 완료되었습니다.');
          navigate('/');
        } else {
          alert('로그인 토큰을 가져오는 중 오류가 발생했습니다.');
        }
      } catch (error) {
        console.error('Failed to fetch Kakao login token:', error);
        alert('로그인 중 오류가 발생했습니다.');
      }
    };

    if (code) {
      fetchToken();
    } else {
      alert('로그인 코드가 없습니다.');
    }
  }, [code, navigate]);

  return <div>로그인 중입니다...</div>;
};
