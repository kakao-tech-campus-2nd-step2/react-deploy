import { AxiosError } from 'axios';
import { initInstance } from '@apis/instance';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { UserInfoData } from '@internalTypes/dataTypes';
import { MemberResponse } from '@internalTypes/responseTypes';
import { MEMBERS_PATHS } from '@apis/path';
import { useAPI } from '@/context/api/useAPI';

const postMemberLogin = async ({ email, password }: UserInfoData, baseURL: string): Promise<MemberResponse> => {
  const instance = initInstance(baseURL);
  const res = await instance.post(MEMBERS_PATHS.LOGIN, {
    email,
    password,
  });
  return res.data;
};

export const useMemberLogin = (): UseMutationResult<MemberResponse, AxiosError, UserInfoData> => {
  const { baseURL } = useAPI();
  return useMutation({
    mutationFn: ({ email, password }: UserInfoData) => postMemberLogin({ email, password }, baseURL),
  });
};
