import { useState } from 'react';

import { BASE_URL, fetchInstance } from '../instance';

interface RegisterRequest {
  email: string;
  password: string;
}

interface RegisterResponse {
  email: string;
  token: string;
}

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);

  const register = async (email: string, password: string) => {
    setLoading(true);
    setRegisterError(null);

    try {
      const requestPayload: RegisterRequest = { email, password };
      const response = await fetchInstance.post<RegisterResponse>(
        `${BASE_URL}/api/members/register`,
        requestPayload,
      );

      if (response.status === 201) {
        return { success: true };
      } else {
        setRegisterError('회원가입 실패');
        return { success: false };
      }
    } catch (error) {
      setRegisterError('회원가입 처리 중 오류가 발생했습니다.');
      console.error(error);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, registerError };
};
