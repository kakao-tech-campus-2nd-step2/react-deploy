import { AxiosError } from 'axios';

import { AUTHROIZATION_API } from '@/api/config';
import { API_ERROR_MESSAGES } from '@/constants/errorMessage';
import { OrderListData } from '@/types/orderType';

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

export type OrderListRequestParams = {
  page?: string;
  size?: number;
};

type OrderListResponse = {
  orderList: OrderListData[];
  nextPageToken?: string;
  pageInfo: {
    totalPages: number;
    totalElements: number;
  };
};

type OrderListResponseRaw = {
  content: OrderListData[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
};

export const fetchOrderList = async (
  params: OrderListRequestParams
): Promise<OrderListResponse> => {
  try {
    const response = await AUTHROIZATION_API.get<OrderListResponseRaw>(
      getOrderListPath(params)
    );
    const { data } = response;
    return {
      orderList: data.content,
      nextPageToken:
        data.page !== data.totalPages - 1
          ? (data.page + 1).toString()
          : undefined,
      pageInfo: {
        totalPages: data.totalPages,
        totalElements: data.totalElements,
      },
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;
      if (response?.status === 401) {
        throw new Error(API_ERROR_MESSAGES.AUTH_ERROR);
      }
    }

    throw new Error(API_ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};

const getOrderListPath = ({ page, size }: OrderListRequestParams) => {
  const params = new URLSearchParams();

  if (page) params.append('page', page);
  if (size) params.append('size', size.toString());

  return `/api/orders?${params.toString()}`;
};
