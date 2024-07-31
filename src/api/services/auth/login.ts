import { AxiosError } from 'axios';

import { BACKEND_API } from '@/api/config';
import { API_ERROR_MESSAGES } from '@/constants/errorMessage';

type LoginRequestBody = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  name: string;
};

type LoginResponseRaw = {
  name: string;
};

export const login = async ({
  email,
  password,
}: LoginRequestBody): Promise<LoginResponse> => {
  try {
    const response = await BACKEND_API.post<LoginResponseRaw>(
      '/api/members/login',
      { email, password }
    );

    const accessToken = response.headers.authorization;

    return { accessToken, name: response.data.name };
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;

      if (response?.status === 401) {
        throw new Error(response.data.detail);
      }
    }

    throw new Error(API_ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};
