import {
  Button,
  Card,
  Checkbox,
  Divider,
  Flex,
  Image,
  Input,
  Select,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import type { FieldErrors } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import useGetPoint from '@/api/hooks/useGetPoint';
import usePostOrder from '@/api/hooks/usePostOrder';
import type { PostOrderRequestBody } from '@/api/type';
import type { RegisterOption } from '@/utils/form';
import { useCreateRegister } from '@/utils/form';

type OrderInfo = {
  message: string;
  needReceipt: boolean;
  receiptType: '개인소득공제' | '사업자증빙용';
  receiptNumber: string;
  point: number;
};

const defaultOrderInfo: OrderInfo = {
  message: '',
  needReceipt: false,
  receiptType: '개인소득공제',
  receiptNumber: '',
  point: 0,
};

export const OrderPage = () => {
  const location = useLocation();
  const { register, handleSubmit, getValues, setValue } = useForm<OrderInfo>({
    defaultValues: defaultOrderInfo,
  });
  const [needReceiptState, setNeedReceiptState] = useState(defaultOrderInfo.needReceipt);
  const { data: userPoint } = useGetPoint();

  const orderInfoOptions: RegisterOption<OrderInfo>[] = [
    {
      name: 'message' as const,
      option: {
        maxLength: 100,
        required: {
          value: true,
          message: '메세지를 입력해주세요.',
        },
      },
    },
    {
      name: 'needReceipt' as const,
    },
    {
      name: 'receiptType' as const,
      option: {
        required: {
          value: needReceiptState,
          message: '현금영수증 종류를 선택해주세요.',
        },
      },
    },
    {
      name: 'receiptNumber' as const,
      option: {
        required: {
          value: needReceiptState,
          message: '현금영수증 번호를 입력해주세요.',
        },
        pattern: {
          value: /^[0-9]+$/,
          message: '숫자만 입력 가능합니다.',
        },
      },
    },
    {
      name: 'point' as const,
      option: {
        required: {
          value: true,
          message: '포인트를 입력해주세요.',
        },
        max: {
          value: userPoint?.point || 0,
          message: '보유한 포인트보다 많이 사용할 수 없습니다.',
        },
        pattern: {
          value: /^[0-9]+$/,
          message: '숫자만 입력 가능합니다.',
        },
      },
    },
  ];

  const getRegister = useCreateRegister<OrderInfo>({
    register: register,
    options: orderInfoOptions,
  });

  const orderPrice = location.state.price * location.state.count;

  const handleNeedReceiptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNeedReceiptState(e.target.checked);
  };

  const handleReceiptNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d+$/.test(value) && value !== '') {
      e.target.value = getValues('receiptNumber');
    }
  };

  const { mutateAsync: order } = usePostOrder();

  const handleOrder = () => {
    const completedOrder: PostOrderRequestBody = {
      optionId: location.state.optionId,
      message: getValues('message'),
      quantity: location.state.count,
      productId: location.state.id,
      point: getValues('point'),
      phone: getValues('receiptNumber'),
      receipt: getValues('needReceipt'),
    };

    order(completedOrder).then(() => {
      alert('주문이 완료되었습니다.');
    });
  };

  const handleError = (errors: FieldErrors<OrderInfo>) => {
    const firstError = Object.values(errors)[0];
    alert(firstError.message);
  };

  const handleAllPointUse = () => {
    setValue('point', userPoint?.point || 0);
  };

  return (
    <Flex h="calc(100vh - 54px)" w="100%" justify="center" pt="10">
      <Flex w="100%" maxW="1280px">
        <Flex
          w="100%"
          maxW="920px"
          flexDir="column"
          borderLeft="2px"
          borderColor="#eeeeee"
          align="start"
          overflow="hidden"
        >
          <Flex w="100%" p="10" flexDir="column" justify="center" align="center">
            <Text fontSize="lg" fontWeight="700">
              나에게 주는 선물
            </Text>
            <Textarea
              role="message"
              w="100%"
              h="100px"
              mt="5"
              bg="#EDF2F6"
              border="none"
              resize="none"
              maxLength={100}
              _focus={{ bg: 'white' }}
              {...getRegister('message')}
              placeholder="선물과 함께 보낼 메세지를 적어보세요"
            />
          </Flex>
          <Divider w="100%" borderWidth="4px" opacity="1" borderColor="#eeeeee" />
          <Flex w="100%" p="5" flexDir="column" justify="center">
            <Text fontWeight="700">선물내역</Text>
            <Card
              w="100%"
              flexDir="row"
              p="5"
              mt="5"
              borderWidth="1px"
              borderColor="#eeeeee"
              shadow="sm"
            >
              <Image w="90px" aspectRatio="1/1" src={location.state.imageUrl} />
              <Flex w="100%" flexDir="column" ml="2">
                <Text>
                  {location.state.name} x {location.state.count}개
                </Text>
              </Flex>
            </Card>
          </Flex>
        </Flex>
        <Flex w="360px" h="100%" p="5" flexDir="column" borderX="2px" borderColor="#eeeeee">
          <Text fontSize="lg" fontWeight="700">
            포인트 사용 ({userPoint?.point || 0}포인트 보유)
          </Text>
          <Flex w="100%" justify="space-between" gap="5" py="5">
            <Input {...getRegister('point')} type="number" placeholder="포인트 입력" />
            <Button onClick={handleAllPointUse} bg="#d8d8d8" fontWeight="400">
              전액 사용
            </Button>
          </Flex>
          <Divider opacity="1" borderColor="#eeeeee" />
          <Text fontSize="lg" fontWeight="700" py="5">
            결제 정보
          </Text>
          <Divider opacity="1" borderColor="#eeeeee" />
          <Flex w="100%" flexDir="column" p="5" gap="2">
            <Checkbox
              role="needReceipt"
              size="lg"
              mb="3"
              colorScheme="yellow"
              {...getRegister('needReceipt')}
              onChange={handleNeedReceiptChange}
            >
              <Text fontSize="md" fontWeight="700">
                현금영수증 신청
              </Text>
            </Checkbox>
            <Select role="receiptType" disabled={!needReceiptState} {...getRegister('receiptType')}>
              <option>개인소득공제</option>
              <option>사업자증빙용</option>
            </Select>
            <Input
              role="receiptNumber"
              type="number"
              disabled={!needReceiptState}
              {...getRegister('receiptNumber')}
              onInput={handleReceiptNumberInput}
              placeholder="(-없이) 숫자만 입력해주세요"
            />
          </Flex>
          <Divider opacity="1" borderColor="#eeeeee" />
          <Flex w="100%" justify="space-between" p="5">
            <Text fontWeight="700">최종 결제금액</Text>
            <Text fontSize="lg" fontWeight="700">{`${orderPrice}원`}</Text>
          </Flex>
          <Divider opacity="1" borderColor="#eeeeee" />
          <Button
            role="submit"
            onClick={handleSubmit(handleOrder, handleError)}
            mt="10"
            bg="#fee500"
            py="2"
            fontWeight="400"
            _hover={{
              bg: '#fee500',
              opacity: 0.8,
            }}
          >
            {`${orderPrice}원 결제하기`}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
