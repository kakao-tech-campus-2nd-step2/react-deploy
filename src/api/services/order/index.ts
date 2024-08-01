import { AxiosError } from 'axios';

import { AUTHROIZATION_API } from '@/api/config';
import { API_ERROR_MESSAGES } from '@/constants/errorMessage';

type OrderRequestBody = {
  productId: number;
  optionId: number;
  quantity: number;
  message: string;
  point: number;
};

export const order = async ({
  productId,
  optionId,
  quantity,
  message,
  point,
}: OrderRequestBody) => {
  try {
    await AUTHROIZATION_API.post('/api/orders', {
      productId,
      optionId,
      quantity,
      message,
      point,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;

      if (response?.status === 400 || response?.status === 404) {
        throw new Error(response.data.detail);
      }
    }

    throw new Error(API_ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};
