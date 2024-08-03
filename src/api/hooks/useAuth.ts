import { useState } from 'react';

import { fetchInstance } from '../instance';

interface AuthResponse {
  status: string;
  message: string;
  data: {
    token: string;
  };
}

const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const register = async (email: string, password: string): Promise<string | null> => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await fetchInstance.post<AuthResponse>('/api/members/register', { email, password });
      setMessage(response.data.message);
      return response.data.data.token;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    } catch (error) {
      setError('Failed to register');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<string | null> => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await fetchInstance.post<AuthResponse>('/api/members/login', { email, password });
      const token = response.data.data.token;
      localStorage.setItem('token', token);  // 토큰을 로컬 저장소에 저장
      setMessage(response.data.message);
      return token;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    } catch (error) {
      setError('Failed to login');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { register, login, loading, error, message };
};

export default useAuth;
