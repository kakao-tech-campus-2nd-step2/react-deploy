import { useMutation } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '@/api/instance';

import type { AuthProps, UserRequestData, UserResponseData } from './type';

export const getLoginPath = () => `${BASE_URL}/api/members/login`;

export const loginUser = async (userData: UserRequestData) => {
  const response = await fetchInstance.post<UserResponseData>(getLoginPath(), userData);
  return response.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (userData: AuthProps) => loginUser(userData),
  });
};
