import { useState } from 'react';

import { BASE_URL } from '../instance';
import { fetchInstance } from '../instance/index';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  email: string;
  token: string;
}

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setLoginError(null);

    try {
      const requestPayload: LoginRequest = { email, password };
      const response = await fetchInstance.post<LoginResponse>(
        `${BASE_URL}/api/members/login`,
        requestPayload,
      );

      if (response.status === 200) {
        const result: LoginResponse = response.data;
        localStorage.setItem('token', result.token);
        return { success: true, email: result.email };
      } else {
        setLoginError('로그인 실패');
        return { success: false };
      }
    } catch (error) {
      setLoginError('로그인 처리 중 오류가 발생했습니다.');
      console.error(error);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, loginError };
};
