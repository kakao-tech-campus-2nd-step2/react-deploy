import { Dispatch, SetStateAction } from 'react';

import { useProductOptions } from '@/api/hooks/useProductOptions';

import { OneTextContainer } from '@/components/OneTextContainer';
import { Container } from '@/components/ui/Layout/Container';

import { QuantityInput } from './QuantityInput';

type OptionSectionProps = {
  productId: number;
  setOptionQuantity: Dispatch<
    SetStateAction<{
      [key: number]: number;
    }>
  >;
};

export const OptionSection = ({
  productId,
  setOptionQuantity,
}: OptionSectionProps) => {
  const { data: options, error } = useProductOptions(productId);

  const handleOptionQuantityChange = (optionId: number, quantity: number) => {
    setOptionQuantity((prev) => ({
      ...prev,
      [optionId]: quantity,
    }));
  };

  if (error) {
    return <OneTextContainer>{error.message}</OneTextContainer>;
  }

  return (
    <Container flexDirection="column" gap="1rem">
      {options.map((option) => (
        <QuantityInput
          key={option.id}
          optionDetail={option}
          handleOptionQuantityChange={handleOptionQuantityChange}
        />
      ))}
    </Container>
  );
};
