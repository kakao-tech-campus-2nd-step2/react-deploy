import axiosInstance from '@apis/instance';
import { AxiosError } from 'axios';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { UserInfoData } from '@internalTypes/dataTypes';
import { MemberResponse } from '@internalTypes/responseTypes';
import { MEMBERS_PATH } from '../path';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const postMemberRegister = async ({ email, password }: UserInfoData): Promise<MemberResponse> => {
  const res = await axiosInstance.post(`${BASE_URL}${MEMBERS_PATH.REGISTER}`, {
    email,
    password,
  });

  return res.data;
};

export const useMemberRegister = (): UseMutationResult<MemberResponse, AxiosError, UserInfoData> =>
  useMutation({
    mutationFn: ({ email, password }: UserInfoData) => postMemberRegister({ email, password }),
  });
