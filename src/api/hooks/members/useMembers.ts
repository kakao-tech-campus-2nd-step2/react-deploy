import { useMutation, type UseMutationResult } from '@tanstack/react-query';

import { fetchInstance } from '../../instance';

type MembersRequestParams = {
  email: string;
  password: string;
};

type MembersResponseData = {
  token: string;
};

type Endpoint = 'register' | 'login';

const postMembers = async (
  endpoint: Endpoint,
  params: MembersRequestParams,
): Promise<MembersResponseData> => {
  const response = await fetchInstance.post(`/api/members/${endpoint}`, params);
  const { token } = response.data;
  const status = response.status;

  console.log('HTTP status: ', status);
  // console.log('token: ', token); // test

  return { token };
};

const useMembers = (
  endpoint: Endpoint,
): UseMutationResult<MembersResponseData, Error, MembersRequestParams> => {
  return useMutation({
    mutationFn: (params: MembersRequestParams) => postMembers(endpoint, params),
  });
};

export const useRegister = () => useMembers('register');

export const useLogin = () => useMembers('login');
