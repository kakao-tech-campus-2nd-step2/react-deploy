import { useMutation } from '@tanstack/react-query';

import { authSessionStorage } from '@/utils/storage';

import { BASE_URL, fetchInstance } from '../instance';

type Props = {
  email: string;
  password: string;
};
export const loginPath = () => `${BASE_URL}/api/members/login`;

export const login = async ({ email, password }: Props) => {
  const response = await fetchInstance.post(loginPath(), {
    email: email,
    password: password,
  });
  return response.data;
};
export const useLogin = ({ email, password }: Props) => {
  return useMutation({
    mutationFn: () => login({ email, password }),
    onError: (error) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      console.log(error.response.data.message);
    },
    onSuccess: (data) => {
      authSessionStorage.set({ token: data.token, name: email });

      const queryParams = new URLSearchParams(window.location.search);
      const redirectUrl = queryParams.get('redirect') ?? `${window.location.origin}/`;
      window.location.replace(redirectUrl);
    },
  });
};
