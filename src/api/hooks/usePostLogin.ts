import { useMutation } from '@tanstack/react-query';

import { getCurrentBaseURL, getCurrentFetchInstance } from '@/api/instance/index';
import type { LoginResponseData } from '@/types';
import type { LoginData } from '@/types';
import { authSessionStorage } from '@/utils/storage';

export const postLoginPath = () => `${getCurrentBaseURL()}/api/members/login`;

export const postLogin = async ({ email, password }: LoginData) => {
  const response = await getCurrentFetchInstance().post<LoginResponseData>(postLoginPath(), {
    email,
    password,
  });
  return response.data;
};

export const usePostLogin = () => {
  return useMutation<LoginResponseData, Error, LoginData>({
    mutationFn: postLogin,
    onSuccess: (data) => {
      authSessionStorage.set({ token: data.token });
    },
  });
};
