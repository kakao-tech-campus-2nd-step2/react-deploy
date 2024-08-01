import { useMutation, type UseMutationResult } from '@tanstack/react-query';

import { BASE_URL } from '../instance';
import { fetchInstance } from '../instance/index';

type RequestParams = {
  email: string;
  password: string;
};

type ResponseData = {
  token: string;
};

const postRegister = async (params: RequestParams): Promise<ResponseData> => {
  const response = await fetchInstance.post(`${BASE_URL}/api/members/register`, params);
  const { token } = response.data;
  const status = response.status;

  console.log('HTTP status: ', status);

  return token;
};

export const useRegister = (): UseMutationResult => {
  return useMutation(postRegister);
};
