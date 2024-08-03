import { AxiosError } from 'axios';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { UserInfoData } from '@internalTypes/dataTypes';
import { initInstance } from '@apis/instance';
import { MemberResponse } from '@internalTypes/responseTypes';
import { MEMBERS_PATHS } from '@apis/path';
import { useAPI } from '@context/api/useAPI';

const postMemberRegister = async ({ email, password }: UserInfoData, baseURL: string): Promise<MemberResponse> => {
  const instance = initInstance(baseURL);
  const res = await instance.post(MEMBERS_PATHS.REGISTER, {
    email,
    password,
  });
  return res.data;
};

export const useMemberRegister = (): UseMutationResult<MemberResponse, AxiosError, UserInfoData> => {
  const { baseURL } = useAPI();
  return useMutation({
    mutationFn: ({ email, password }: UserInfoData) => postMemberRegister({ email, password }, baseURL),
  });
};
