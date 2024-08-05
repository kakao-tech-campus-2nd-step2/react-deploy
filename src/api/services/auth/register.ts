import { AxiosError } from 'axios';

import { BACKEND_API } from '@/api/config';
import { API_ERROR_MESSAGES } from '@/constants/errorMessage';

export type RegisterRequestBody = {
  email: string;
  name: string;
  password: string;
};

export const register = async ({
  email,
  name,
  password,
}: RegisterRequestBody) => {
  try {
    await BACKEND_API.post('/api/members/register', {
      email,
      name,
      password,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;

      if (response?.status === 400) {
        throw new Error(response.data.detail);
      }
    }

    throw new Error(API_ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};
