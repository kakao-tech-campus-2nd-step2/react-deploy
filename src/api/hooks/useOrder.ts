import { useMutation } from "@tanstack/react-query";

import { BASE_URL, fetchInstance } from "../instance";

export type AddOrderRequestParams = {
  productId: number;
  productQuantity: number;
  hasCashReceipt: boolean;
  cashReceiptType: string;
  cashReceiptNumber: string;
  message: string;
  point: number;
};

const addOrderPath = `${BASE_URL}/api/orders`;

const getAddOrder = async (params: AddOrderRequestParams): Promise<void> => {
  await fetchInstance.post<void>(addOrderPath, params);
};

export const useAddOrder = () => {
  return useMutation<void, Error, AddOrderRequestParams>({
    mutationFn: (params: AddOrderRequestParams) => getAddOrder(params),
  });
};
