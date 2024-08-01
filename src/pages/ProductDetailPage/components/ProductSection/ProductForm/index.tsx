import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDisclosure } from '@chakra-ui/react';

import { useProductOptions } from '@/api/hooks/useProductOptions';
import { useAuth } from '@/provider/auth/useAuth';
import { ROUTER_PATH } from '@/routes/path';
import { OrderHistory } from '@/types/orderType';

import { OneTextContainer } from '@/components/OneTextContainer';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Dialog/Alert';
import { Confirm } from '@/components/ui/Dialog/Confirm';
import { Container } from '@/components/ui/Layout/Container';

import { QuantityInput } from './QuantityInput';
import { TotalPriceCallout } from './TotalPriceCallout';
import { WishButton } from './WishButton';
import { containerStyle, submitButton } from './style';

type ProductFormProps = {
  productId: number;
  price: number;
};

export const ProductForm = ({ productId, price }: ProductFormProps) => {
  const { data: options, error } = useProductOptions(productId);
  const [totalQuantity, setTotalQuantity] = useState(0);

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

  if (error) {
    return <OneTextContainer>{error.message}</OneTextContainer>;
  }

  const onClick = () => {
    if (!authInfo) {
      confirmOpen();
      return;
    }

    if (!totalQuantity) {
      alertOpen();
      return;
    }

    const state: OrderHistory = {
      productId,
      productQuantity: totalQuantity,
    };

    navigate(ROUTER_PATH.ORDER, { state });
  };

  return (
    <Container
      flexDirection="column"
      justifyContent="space-between"
      css={containerStyle}
    >
      {options.map((option) => (
        <QuantityInput
          key={option.id}
          optionDetail={option}
          setTotalQuantity={setTotalQuantity}
        />
      ))}
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
      <Alert
        message="상품을 추가해주세요."
        isOpen={isAlertOpen}
        onClose={alertClose}
      />
    </Container>
  );
};
