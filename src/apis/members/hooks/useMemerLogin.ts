import { AxiosError } from 'axios';
import initInstance from '@apis/instance';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { UserInfoData } from '@internalTypes/dataTypes';
import { MemberResponse } from '@internalTypes/responseTypes';
import { MEMBERS_PATHS } from '@apis/path';

const loginInstance = initInstance(process.env.REACT_APP_EUN_KYOUNG_BASE_URL);

const postMemberLogin = async ({ email, password }: UserInfoData): Promise<MemberResponse> => {
  const res = await loginInstance.post(MEMBERS_PATHS.REGISTER, {
    email,
    password,
  });
  return res.data;
};

export const useMemberLogin = (): UseMutationResult<MemberResponse, AxiosError, UserInfoData> =>
  useMutation({
    mutationFn: ({ email, password }: UserInfoData) => postMemberLogin({ email, password }),
  });
