import { useMutation } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';

interface OrderType {
  optionId: number;
  quantity: number;
  message: string;
}

const orderPath = `${BASE_URL}/api/orders`;

const order = async (orderInfo: OrderType) => {
  const response = await fetchInstance.post(orderPath, orderInfo);
  return response;
};

export const userOrder = () =>
  useMutation({
    mutationFn: async (orderInfo: OrderType) => await order(orderInfo),
    onSuccess: () => {
      alert('주문이 완료되었습니다.');
      window.location.replace(`${window.location.origin}/`);
    },
    onError: error => {
      alert('주문에 실패했습니다.');
      console.error(error);
    },
  });
