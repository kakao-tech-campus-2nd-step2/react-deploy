import { initInstance } from '@apis/instance';
import { AxiosError } from 'axios';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { UserInfoData } from '@internalTypes/dataTypes';
import { MemberResponse } from '@internalTypes/responseTypes';
import { MEMBERS_PATHS } from '@apis/path';

const registerInstance = initInstance(process.env.REACT_APP_EUN_KYOUNG_BASE_URL);

const postMemberRegister = async ({ email, password }: UserInfoData): Promise<MemberResponse> => {
  const res = await registerInstance.post(MEMBERS_PATHS.REGISTER, {
    email,
    password,
  });
  return res.data;
};

export const useMemberRegister = (): UseMutationResult<MemberResponse, AxiosError, UserInfoData> =>
  useMutation({
    mutationFn: ({ email, password }: UserInfoData) => postMemberRegister({ email, password }),
  });
