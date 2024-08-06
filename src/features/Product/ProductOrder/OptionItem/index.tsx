import React from 'react';
import styled from '@emotion/styled';
import { UseFormSetValue } from 'react-hook-form';
import { QuantityValues } from '..';
import QuantitySelector from './QuantitySelector';

interface OptionItemProps {
  name: string;
  quantity: number;
  setValue: UseFormSetValue<QuantityValues>;
}

export default function OptionItem({ name, quantity, setValue }: OptionItemProps) {
  return (
    <OptionItemContainer>
      <Title data-testid="option-name">{name}</Title>
      <QuantitySelector quantity={quantity} setValue={setValue} />
    </OptionItemContainer>
  );
}

const OptionItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 14px 16px;
  border: 1px solid rgb(237, 237, 237);
  border-radius: 2px;
  margin-bottom: 16px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Title = styled.p`
  font-weight: 700;
  margin-bottom: 12px;
`;
