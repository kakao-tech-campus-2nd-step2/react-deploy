import { useMutation } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '@/api/instance';

import type { UserRequestData, UserResponseData } from './type';

export const getRegisterPath = () => `${BASE_URL}/api/members/register`;

export const registerUser = async (data: UserRequestData) => {
  const response = await fetchInstance.post<UserResponseData>(getRegisterPath(), data);
  return response.data;
};

export const useRegister = () =>
  useMutation({
    mutationFn: (userData: UserRequestData) => registerUser(userData),
  });
