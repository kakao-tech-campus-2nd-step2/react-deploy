import { fetchInstance } from '@/api/instance/index';

interface AuthResponse {
  token: string;
}

// 회원가입
export const register = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await fetchInstance.post<AuthResponse>('/api/members/register', {
    email,
    password,
  });
  return response.data;
};

// 로그인
export const login = async (email: string, password: string): Promise<string> => {
    const response = await fetchInstance.post<AuthResponse>('/api/members/login', {
      email,
      password,
    });

    const authHeader = response.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      return token;
    } else {
      console.error('Authorization 헤더에 토큰이 포함되지 않음');
      throw new Error('No token received');
    }
  };
