import { authSessionStorage } from '@/utils/storage';

import { fetchInstance } from '../instance';

export const login = async (email: string, password: string): Promise<string> => {
  const response = await fetchInstance.post('/api/members/login', { email, password });
  const token = response.data.token; // 서버에서 받은 JWT 토큰

  authSessionStorage.set(token);
  return token;
};

// 인증 관련 함수들 추가
export const fetchNewToken = async (): Promise<string> => {
  const email = localStorage.getItem('email');
  const password = localStorage.getItem('password');

  if (!email || !password) {
    throw new Error('No email or password found in localStorage');
  }

  const token = await login(email, password); // 로그인 API를 호출하여 토큰을 갱신

  authSessionStorage.set(token); // 새로운 토큰을 저장
  return token;
};

export const getToken = async (): Promise<string> => {
  let token = authSessionStorage.get();

  if (!token) {
    token = await fetchNewToken();
  }
  return token;
};
