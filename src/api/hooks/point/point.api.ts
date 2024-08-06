import { useMutation } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '@/api/instance';

import type { PointResponseData } from './type';

export const getPointsPath = () => `${BASE_URL}/api/Points`;

export const getPoints = async () => {
  const response = await fetchInstance.post<PointResponseData>(getPointsPath());
  return response.data;
};

export const useGetPoints = () => {
  return useMutation<PointResponseData, Error>({
    mutationFn: getPoints,
  });
};
