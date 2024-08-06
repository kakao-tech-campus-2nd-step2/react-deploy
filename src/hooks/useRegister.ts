import { useState } from 'react';
import axios from 'axios';
import { authSessionStorage } from '@/utils/storage';
import { useSearchParams } from 'react-router-dom';

export const useRegister = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [queryParams] = useSearchParams();

  const handleRegister = async (email: string, password: string) => {
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/members/register', {
        email,
        password,
      });

      const { token } = response.data;
      authSessionStorage.set(token);

      const redirectUrl = queryParams.get('redirect') ?? `${window.location.origin}/`;
      window.location.replace(redirectUrl);
    } catch (error: any) {
      const message = error.response?.data?.message || '회원가입에 실패했습니다.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, error, loading };
};
