import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { getCurrentBaseURL } from '@/api/instance';

const token = sessionStorage.getItem('token');

export const getWishPath = () => {
  return `${getCurrentBaseURL()}/api/wishes?page=0&size=10&sort=createdDate,desc`;
};

const apiClient = axios.create({
  baseURL: getCurrentBaseURL(),
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getWish = async () => {
  const response = await apiClient.get(getWishPath());
  return response.data.content;
};

export const useGetWishList = () => {
  return useQuery({
    queryKey: ['getWishList'],
    queryFn: getWish,
  });
};
