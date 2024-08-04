import { useMutation } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';

type Props = {
  email: string;
  password: string;
};
export const createAccountPath = () => `${BASE_URL}/api/members/register`;

export const createAccount = async ({ email, password }: Props) => {
  return fetchInstance.post(createAccountPath(), {
    email: email,
    password: password,
  });
};
export const useCreateAccount = ({ email, password }: Props) => {
  return useMutation({
    mutationFn: () => createAccount({ email, password }),
    onError: () => {
      console.error('에러 발생');
    },
  });
};
