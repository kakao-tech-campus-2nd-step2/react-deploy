import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { authSessionStorage } from '@/utils/storage';

import { fetchInstance } from '../instance';
import { BASE_URL } from '../instance';

type JoinParams = {
  email: string;
  password: string;
};

type JoinResponse = {
  email: string;
  token: string;
};

type ErrorResponse = {
  message: string;
};

const join = async (params: JoinParams): Promise<JoinResponse> => {
  const { data } = await fetchInstance.post<JoinResponse>(
    `${BASE_URL}/api/members/register`,
    params,
  );
  return data;
};

export const useJoin = () => {
  return useMutation<JoinResponse, AxiosError<ErrorResponse>, JoinParams>({
    mutationFn: join,
    onSuccess: (data) => {
      authSessionStorage.set(data.token);
      alert('회원가입되었습니다.');
      window.location.replace('/');
    },
    onError: (error) => {
      alert(error.response?.data?.message || '회원가입 중 오류가 발생했습니다.');
    },
  });
};
