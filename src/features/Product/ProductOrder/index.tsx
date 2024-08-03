import React from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { ROUTE_PATH } from '@routes/path';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@context/auth/useAuth';
import { Button } from '@components/common';
import { useGetProductsOption } from '@apis/products/hooks/useGetProductsOption';
import OptionItem from './OptionItem';

export interface QuantityValues {
  quantity: number;
}

interface ProductOrderProps {
  price: number;
}

export default function ProductOrder({ price }: ProductOrderProps) {
  const { productId } = useParams<{ productId: string }>();
  const { data: productOption } = useGetProductsOption({ productId });
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { watch, setValue } = useForm<QuantityValues>({
    defaultValues: {
      quantity: 1,
    },
  });

  const handleOrderClick = () => {
    const data = { quantity: watch('quantity') };
    if (productOption) {
      const orderHistory = {
        productId: Number(productId),
        optionId: productOption[0].id,
        quantity: data.quantity,
        price,
      };
      sessionStorage.setItem('orderHistory', JSON.stringify(orderHistory));
      const targetPath = isAuthenticated ? ROUTE_PATH.ORDER : ROUTE_PATH.LOGIN;
      navigate(targetPath);
    }
  };

  return (
    <ProductOrderContainer>
      <OptionsContainer>
        {productOption?.map((option) => (
          <OptionItem key={option.id} name={option.name} quantity={option.quantity} setValue={setValue} />
        ))}
      </OptionsContainer>
      <div>
        <TotalAmount>
          <dl>
            <dt>총 결제 금액</dt>
            <dd>{`${price}원`}</dd>
          </dl>
        </TotalAmount>
        <Button theme="darkGray" onClick={handleOrderClick}>
          나에게 선물하기
        </Button>
      </div>
    </ProductOrderContainer>
  );
}

const ProductOrderContainer = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 360px;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TotalAmount = styled.div`
  padding: 18px 20px;
  border-radius: 4px;
  background-color: rgb(245, 245, 245);
  margin-bottom: 20px;

  dl {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
  }

  dt {
    font-size: 14px;
  }

  dd {
    font-size: 20px;
  }
`;
