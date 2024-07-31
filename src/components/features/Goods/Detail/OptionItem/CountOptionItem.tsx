import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { IconButton, Input, useNumberInput } from '@chakra-ui/react';
import styled from '@emotion/styled';
import type { ChangeEvent } from 'react';

type Props = {
  selectOptions: { id: number; name: string }[];
  minValues?: number;
  maxValues: number;
  value: string;
  onChange: (value: string) => void;
  onOptionChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export const CountOptionItem = ({
  selectOptions,
  minValues = 1,
  maxValues,
  value,
  onChange,
  onOptionChange,
}: Props) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    min: minValues,
    max: maxValues,
    defaultValue: value,
    onChange: (valueAsString) => {
      onChange(valueAsString);
    },
  });

  const increment = getIncrementButtonProps();
  const decrement = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <Wrapper>
      <StyledSelect id="option-select" onChange={onOptionChange}>
        {selectOptions.map(option => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </StyledSelect>
      <InputWrapper>
        <StyledIconButton {...decrement} aria-label="수량 1개 감소" icon={<MinusIcon />} />
        <StyledInput {...input} />
        <StyledIconButton {...increment} aria-label="수량 1개 추가" icon={<AddIcon />} />
      </InputWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 12px 14px 16px;
  border: 1px solid #ededed;
  border-radius: 2px;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const StyledIconButton = styled(IconButton)`
  width: 40px;
  height: 40px;
`;

const StyledInput = styled(Input)`
  text-align: center;
  flex: 1;
  height: 40px;
  font-size: 16px;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 20px;
`;
