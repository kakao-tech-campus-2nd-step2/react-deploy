import { useMutation } from '@tanstack/react-query';

import { BASE_URL, fetchAuthInstance } from '../instance';

type Props = {
  id: number;
  count: number;
  message: string;
  phoneNumber?: string;
};

export const makeOrderPath = () => `${BASE_URL}/api/orders`;

export const makeOrder = async ({ id, count, message, phoneNumber }: Props) => {
  return fetchAuthInstance.post(makeOrderPath(), {
    optionId: id,
    quantity: count,
    message: message,
    phoneNumber: phoneNumber,
  });
};

export const useMakeOrder = () => {
  return useMutation({
    mutationFn: ({ id, count, message, phoneNumber }: Props) =>
      makeOrder({ id, count, message, phoneNumber }),
    onError: () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      console.log(error.response.data.message);
    },
  });
};
