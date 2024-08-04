import { useMutation } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '@/api/instance';

import type { KakaoResponseData } from './type';

export const getKakaoLoginpath = () => `${BASE_URL}/oauth/kakao/login`;

export const kakaoLoginUser = async (): Promise<KakaoResponseData> => {
  const response = await fetchInstance.get<KakaoResponseData>(getKakaoLoginpath());
  console.log(response);
  return response.data;
};

export const useKakaoCallback = async (code: string): Promise<KakaoResponseData> => {
  const response = await fetchInstance.get<KakaoResponseData>(
    `${BASE_URL}/oauth/kakao/callback?code=${code}`,
  );
  return response.data;
};

export const useKakaoLogin = () => {
  return useMutation({
    mutationFn: kakaoLoginUser,
  });
};

export const useKakaoCallbackMutation = () => {
  return useMutation({
    mutationFn: useKakaoCallback,
  });
};
