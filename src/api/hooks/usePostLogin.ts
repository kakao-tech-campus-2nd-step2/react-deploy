import { useMutation } from '@tanstack/react-query';

import type { UserData } from '@/types';

import { APIPath } from '../apiPath';
import { BASE_URL, fetchInstance } from '../instance';

export const getLoginPath = () => `${BASE_URL}${APIPath.login}`;

export const postLogin = async (req: UserData) => {
  const response = await fetchInstance.post(getLoginPath(), req);
  return response.data;
};

export const FetchLogin = (req: UserData) =>
  useMutation({
    mutationFn: () => postLogin(req),
  });
