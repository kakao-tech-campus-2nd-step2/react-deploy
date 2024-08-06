import { useMutation } from '@tanstack/react-query';

import { getCurrentBaseURL, getCurrentFetchInstance } from '@/api/instance/index';
import type { LoginResponseData } from '@/types';
import type { LoginData } from '@/types';
import { authSessionStorage } from '@/utils/storage';

export const postMembershipPath = () => `${getCurrentBaseURL()}/api/members/register`;

export const postMembership = async ({ email, password }: LoginData) => {
  console.log(postMembershipPath());
  const response = await getCurrentFetchInstance().post<LoginResponseData>(postMembershipPath(), {
    email,
    password,
  });
  return response.data;
};

export const usePostMembership = () => {
  return useMutation<LoginResponseData, Error, LoginData>({
    mutationFn: postMembership,
    onSuccess: (data) => {
      authSessionStorage.set({ token: data.token });
      console.log('Auth token stored:', authSessionStorage.get());
    },
  });
};
