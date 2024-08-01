import { BACKEND_API } from '@/api/config';
import { API_ERROR_MESSAGES } from '@/constants/errorMessage';

type KakaoLoginRequstParam = {
  code: string;
};

type LoginResponse = {
  accessToken: string;
  name: string;
};

type KakaoLoginResponseRaw = {
  name: string;
};

export const kakaoLogin = async ({
  code,
}: KakaoLoginRequstParam): Promise<LoginResponse> => {
  try {
    const response = await BACKEND_API.get<KakaoLoginResponseRaw>(
      `/api/oauth/kakao/login/callback?code=${code}`
    );

    const accessToken = response.headers.authorization;

    return { accessToken, name: response.data.name };
  } catch (error) {
    throw new Error(API_ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};
