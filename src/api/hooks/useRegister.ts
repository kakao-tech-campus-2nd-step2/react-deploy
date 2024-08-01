import { useMutation, type UseMutationResult } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';

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
  console.log('token: ', token); // test

  return token;
};

export const useRegister = (): UseMutationResult<ResponseData, Error, RequestParams> => {
  return useMutation({ mutationFn: (params: RequestParams) => postRegister(params) });
};
