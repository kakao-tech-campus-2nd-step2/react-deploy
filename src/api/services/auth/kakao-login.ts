import { BACKEND_API } from '@/api/config';
import { API_ERROR_MESSAGES } from '@/constants/errorMessage';

import { LoginResponse, LoginResponseRaw } from './login';

type KakaoLoginRequstParam = {
  code: string;
};

export const kakaoLogin = async ({
  code,
}: KakaoLoginRequstParam): Promise<LoginResponse> => {
  try {
    const response = await BACKEND_API.get<LoginResponseRaw>(
      `/api/oauth/kakao/login/callback?code=${code}&redirect-url=${import.meta.env.VITE_REDIRECT_URL}`
    );

    const accessToken = response.headers.authorization;

    return { accessToken, userInfo: response.data };
  } catch (error) {
    throw new Error(API_ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};
