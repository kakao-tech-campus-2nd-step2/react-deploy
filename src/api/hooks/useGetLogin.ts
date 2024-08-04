import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useSearchParams } from 'react-router-dom';

import { authSessionStorage } from '@/utils/storage';

import { BASE_URL, fetchInstance } from '../instance';

type LoginCredentials = {
  email: string;
  password: string;
};

type AuthResponse = {
  email: string;
  token: string;
};

type LoginError = {
  message: string;
};

export const getLoginPath = () => `${BASE_URL}/api/members/login`;

const performLoginRequest = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await fetchInstance.post<AuthResponse>(getLoginPath(), credentials);
  return response.data;
};

export const useLogin = () => {
  const [queryParams] = useSearchParams();

  const { mutate, ...rest } = useMutation<AuthResponse, AxiosError<LoginError>, LoginCredentials>({
    mutationKey: [getLoginPath()],
    mutationFn: performLoginRequest,
    onSuccess: (data) => {
      authSessionStorage.set(data.token);
      alert('로그인에 성공했습니다.');
      const redirectUrl = queryParams.get('redirect') ?? window.location.origin;
      window.location.replace(redirectUrl);
    },
    onError: (error) => {
      alert(error.response?.data?.message || '로그인 과정에서 오류가 발생했습니다.');
    },
  });

  return { mutate, ...rest };
};
