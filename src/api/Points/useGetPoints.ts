import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { getCurrentBaseURL } from '../instance';

export const getPointsPath = () => {
  return `${getCurrentBaseURL()}/api/points`;
};

const token = sessionStorage.getItem('token');

export const apiClient = axios.create({
  baseURL: getCurrentBaseURL(),
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getPoints = async () => {
  const response = await apiClient.get(getPointsPath());
  return response.data;
};

export const useGetPoints = () => {
  return useQuery({
    queryKey: ['getPoints'],
    queryFn: getPoints,
  });
};
