import { AxiosError } from 'axios';
import { fetchInstance } from './instance';

export const login = async (email: string, password: string) => {
  try {
    const response = await fetchInstance.post('/api/members/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Error:', error);
      if (error.response && error.response.status === 403) {
        throw new Error('아이디 또는 비밀번호가 잘못되었습니다.');
      }
    }
    throw new Error('로그인 중 오류가 발생했습니다.');
  }
};

export const register = async (email: string, password: string) => {
  try {
    const response = await fetchInstance.post('/api/members/register', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Error:', error);
      if (error.response && error.response.status === 400) {
        throw new Error('입력값이 올바르지 않습니다.\n 다시 시도해주세요.');
      }
    }
    throw new Error('회원가입 중 오류가 발생했습니다.');
  }
};
