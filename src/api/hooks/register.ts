import { authSessionStorage } from '@/utils/storage'; // import the storage utility

import { fetchInstance } from '../instance';

export const registerAndLogin = async (email: string, password: string): Promise<void> => {
  try {
    // 1. 회원가입 요청
    await fetchInstance.post('/api/members/register', {
      email: email,
      password: password,
    });

    // 2. 회원가입 후 로그인 요청
    const response = await fetchInstance.post<{ token: string }>('/api/members/login', {
      email: email,
      password: password,
    });

    // 3. 토큰을 세션 스토리지에 저장
    const token = response.data.token;
    authSessionStorage.set(token);
  } catch (error) {


    console.error('회원가입 및 로그인 처리 중 오류가 발생했습니다.', error);

    throw error; // Optionally handle the error further or rethrow it
  }
};
