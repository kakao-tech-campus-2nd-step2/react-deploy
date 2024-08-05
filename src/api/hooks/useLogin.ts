import { useMutation } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';
import { useSearchParams } from 'react-router-dom';

import { authSessionStorage } from '@/utils/storage';

import { BASE_URL, fetchInstance } from '../instance';

interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  email: string;
  token: string;
}

interface ErrorResponse {
  message: string;
}

const login = async (params: LoginParams): Promise<AxiosResponse<LoginResponse>> => {
  return fetchInstance.post<LoginResponse>(`${BASE_URL}/api/users/login`, params);
};

export const useLogin = () => {
  const [queryParams] = useSearchParams();

  const { mutate } = useMutation<
    AxiosResponse<LoginResponse>,
    AxiosError<ErrorResponse>,
    LoginParams
  >({
    mutationFn: login,
    onSuccess: (response) => {
      const token = response.headers.authorization?.split(' ')[1];
      if (token) {
        authSessionStorage.set(token);
        alert('로그인이 완료되었습니다.');
        const redirectUrl = queryParams.get('redirect') ?? window.location.origin;
        window.location.replace(redirectUrl);
      } else {
        alert('토큰을 추출하는 중 오류가 발생했습니다.');
      }
    },
    onError: (error) => {
      alert(error.response?.data?.message || '로그인 중 오류가 발생했습니다.');
    },
  });

  return { mutate };
};
