import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { IconButton, Input, Select, useNumberInput } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';

type OptionItem = {
  id: number;
  name: string;
  quantity: number;
};
type Props = {
  options: OptionItem[];
  minValues?: number;
  value: string;
  onChange: (value: string) => void;
  setOptionId: (id: string) => void;
};

export const CountOptionItem = ({
  options,
  minValues = 1,
  value,
  onChange,
  setOptionId,
}: Props) => {
  const [maxValue, setMaxValue] = useState(100);

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    min: minValues,
    max: maxValue,
    defaultValue: value,
    onChange: (valueAsString) => {
      onChange(valueAsString);
    },
  });
  const increment = getIncrementButtonProps();
  const decrement = getDecrementButtonProps();
  const input = getInputProps();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = JSON.parse(e.target.value);
    setMaxValue(Number(option.quantity));
    setOptionId(option.id);
  };

  return (
    <Wrapper>
      <Select onChange={handleChange}>
        {options.map((option) => (
          <option key={option.id} value={JSON.stringify(option)}>
            {option.name}
          </option>
        ))}
      </Select>
      <InputWrapper>
        <IconButton {...decrement} aria-label="수량 1개 감소" icon={<MinusIcon />} />
        <Input test-data="수량" {...input} />
        <IconButton {...increment} aria-label="수량 1개 추가" icon={<AddIcon />} />
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

// const Title = styled.p`
//   font-weight: 700;
//   line-height: 22px;
//   color: #111;
//   word-wrap: break-word;
//   word-break: break-all;
// `;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 8px;
  gap: 8px;
`;
