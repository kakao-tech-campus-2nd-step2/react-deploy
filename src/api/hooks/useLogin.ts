import { useMutation } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';
import { authSessionStorage } from '@/utils/storage';

export interface LoginInfoType {
  email: string;
  password: string;
}

const LoginPath = `${BASE_URL}/api/members/login`;

const Login = async (LoginInfo: LoginInfoType) => {
  const response = await fetchInstance.post(LoginPath, LoginInfo);
  return response.data;
};

export const userLogin = (redirect: string) =>
  useMutation({
    mutationFn: (LoginInfo: LoginInfoType) => Login(LoginInfo),
    onSuccess: data => {
      alert('로그인이 완료되었습니다.');

      sessionStorage.setItem('email', data.email);
      authSessionStorage.set(data.token);
      const redirectUrl = redirect;
      window.location.replace(redirectUrl);
    },
    onError: error => {
      alert('로그인에 실패했습니다.');
      console.error(error);
    },
  });
