import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Divider, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { order } from '@/api/services/order';
import { OrderField, OrderSchema } from '@/schema/index';
import { OrderHistory } from '@/types/orderType';

import { Content } from '@/components/Content';
import { Alert } from '@/components/ui/Dialog/Alert';
import { Form } from '@/components/ui/Form';

import { GiftSection } from './GiftSection';
import { PaymentSection } from './PaymentSection';

type OrderFormProps = {
  orderHistory: OrderHistory;
};

export const OrderForm = ({ orderHistory }: OrderFormProps) => {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [alertMessage, setAlertMessage] = useState('');

  const { mutate, status } = useMutation({
    mutationFn: order,
    onSuccess: () => {
      setAlertMessage('주문이 완료되었습니다.');
      onOpen();
    },
    onError: (error) => setAlertMessage(error.message),
  });

  const form = useForm<OrderField>({
    resolver: zodResolver(OrderSchema),
    mode: 'onSubmit',
    defaultValues: {
      gitfMessage: '',
      isCashChecked: false,
      cashReceiptNumber: '',
      point: '',
    },
  });

  const onSubmit = () => {
    const orderResponse = {
      productId: orderHistory.productId,
      optionId: orderHistory.optionId,
      quantity: orderHistory.quantity,
      message: form.getValues('gitfMessage'),
      point: Number(form.getValues('point')),
    };

    mutate(orderResponse);
  };

  const handleSubmit = form.handleSubmit(onSubmit, (errors) => {
    const errorMessages =
      Object.values(errors).flatMap((error) => error.message)[0] || '';

    setAlertMessage(errorMessages);
    onOpen();
  });

  const handleCloseAlert = () => {
    onClose();
    const isSuccessMessage = alertMessage === '주문이 완료되었습니다.';
    setAlertMessage('');

    if (isSuccessMessage) {
      navigate(-2);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <Content height="92vh" maxWidth="1280px">
          <Divider orientation="vertical" />
          <GiftSection orderHistory={orderHistory} />
          <Divider orientation="vertical" />
          <PaymentSection
            orderHistory={orderHistory}
            isLoading={status === 'pending'}
          />
          <Divider orientation="vertical" />
        </Content>
      </form>
      {isOpen && (
        <Alert
          message={alertMessage}
          isOpen={isOpen}
          onClose={handleCloseAlert}
        />
      )}
    </Form>
  );
};
