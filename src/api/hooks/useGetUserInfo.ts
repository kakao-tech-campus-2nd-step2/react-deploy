import { useQuery } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';

interface UserInfo {
  email: string;
  remain_point: number;
}

export const getUserInfoPath = () => `${BASE_URL}/api/members/me`;

export const getUserInfo = async (userId: number) => {
  const response = await fetchInstance.get<UserInfo>(getUserInfoPath(), {
    params: { userId },
  });
  return response.data;
};

export const useGetUserInfo = (userId: number) =>
  useQuery<UserInfo, Error>({
    queryKey: ['userInfo', userId],
    queryFn: () => getUserInfo(userId),
    enabled: userId !== undefined, // userId가 undefined가 아닌 경우에만 쿼리를 실행
  });
