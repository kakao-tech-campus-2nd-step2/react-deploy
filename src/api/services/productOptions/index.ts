import { AxiosError } from 'axios';

import { BACKEND_API } from '@/api/config';
import { API_ERROR_MESSAGES } from '@/constants/errorMessage';
import { Option } from '@/types/productType';

type ProductOptionsRequestParams = {
  productId: number;
};

type ProductOptionsResponse = {
  optionCount: number;
  options: Option[];
};

export const fetchProductOptions = async ({
  productId,
}: ProductOptionsRequestParams) => {
  try {
    const response = await BACKEND_API.get<ProductOptionsResponse>(
      `/api/products/${productId}/options`
    );
    return response.data.options;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;

      if (response?.status === 404) {
        throw new Error(response?.data.detail);
      }
    }

    throw new Error(API_ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};
