import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDisclosure } from '@chakra-ui/react';

import { useAuth } from '@/provider/auth/useAuth';
import { ROUTER_PATH } from '@/routes/path';
import { OrderHistory } from '@/types/orderType';

import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Dialog/Alert';
import { Confirm } from '@/components/ui/Dialog/Confirm';
import { Container } from '@/components/ui/Layout/Container';

import { OptionSection } from './OptionSection';
import { TotalPriceCallout } from './TotalPriceCallout';
import { WishButton } from './WishButton';
import { containerStyle, submitButton } from './style';

type ProductFormProps = {
  productId: number;
  price: number;
};

export const ProductForm = ({ productId, price }: ProductFormProps) => {
  const navigate = useNavigate();
  const { authInfo } = useAuth();

  const {
    isOpen: isConfirmOpen,
    onOpen: confirmOpen,
    onClose: confirmClose,
  } = useDisclosure();
  const {
    isOpen: isAlertOpen,
    onOpen: alertOpen,
    onClose: alertClose,
  } = useDisclosure();
  const [alertMessage, setAlertMessage] = useState('');

  const [optionQuantity, setOptionQuantity] = useState<{
    [key: number]: number;
  }>([]);
  const totalQuantity = getTotalQuantity(optionQuantity);

  const onClick = () => {
    if (!authInfo) {
      confirmOpen();
      return;
    }

    if (!totalQuantity) {
      setAlertMessage('상품을 추가해주세요.');
      alertOpen();
      return;
    }

    const optionId = getSingleKeyWithValue(optionQuantity);

    if (!optionId) {
      setAlertMessage('하나의 옵션만 선택해주세요.');
      alertOpen();
      return;
    }

    const state: OrderHistory = {
      productId,
      optionId,
      quantity: totalQuantity,
    };

    navigate(ROUTER_PATH.ORDER, { state });
  };

  return (
    <Container
      flexDirection="column"
      justifyContent="space-between"
      css={containerStyle}
    >
      <OptionSection
        productId={productId}
        setOptionQuantity={setOptionQuantity}
      />
      <Container flexDirection="column" gap="1rem">
        <TotalPriceCallout totalPrice={totalQuantity * price} />
        <Container gap="0.5rem">
          <WishButton productId={productId} />
          <Button theme="black" onClick={onClick} css={submitButton}>
            나에게 선물하기
          </Button>
        </Container>
      </Container>
      <Confirm
        message={`로그인이 필요한 메뉴입니다.
            로그인 페이지로 이동하시겠습니까?`}
        isOpen={isConfirmOpen}
        onClose={confirmClose}
        onConfirm={() => navigate(ROUTER_PATH.LOGIN)}
      />
      <Alert message={alertMessage} isOpen={isAlertOpen} onClose={alertClose} />
    </Container>
  );
};

const getTotalQuantity = (optionQuantity: { [key: number]: number }) => {
  return Object.values(optionQuantity).reduce((total, cur) => total + cur, 0);
};

const getSingleKeyWithValue = (optionQuantity: { [key: number]: number }) => {
  const keysWithValue = Object.keys(optionQuantity).filter(
    (key) => optionQuantity[Number(key)] > 0
  );

  if (keysWithValue.length === 1) {
    return Number(keysWithValue[0]);
  }

  return undefined;
};
