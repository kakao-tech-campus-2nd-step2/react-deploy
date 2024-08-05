import { AUTHROIZATION_API } from '@/api/config';
import { API_ERROR_MESSAGES } from '@/constants/errorMessage';

type MyPointResponse = {
  point: number;
};

export const fetchMyPoint = async () => {
  try {
    const response =
      await AUTHROIZATION_API.get<MyPointResponse>('/api/members/point');

    return response.data.point;
  } catch (error) {
    throw new Error(API_ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};
