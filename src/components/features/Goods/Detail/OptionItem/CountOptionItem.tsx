import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { IconButton, Input, useNumberInput } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useState } from "react";

type Props = {
  name: string;
  minValues?: number;
  maxValues?: number;
  value: string;
  isSelect?: boolean;
  onChange: (value: string) => void;
  onClick?: () => void;
};

export const CountOptionItem = ({
  name,
  minValues = 1,
  maxValues = 100,
  value,
  isSelect = false,
  onChange,
  onClick,
}: Props) => {
  const [inputValue, setInputValue] = useState(value);

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    min: minValues,
    max: maxValues,
    value: Number(inputValue),
    onChange: (valueAsString) => {
      setInputValue(valueAsString);
      onChange(valueAsString);
    },
  });

  const increment = getIncrementButtonProps();
  const decrement = getDecrementButtonProps();
  const input = getInputProps();

  const handleClick = () => {
    setInputValue("1");
    if (onClick) onClick();
  };

  if (isSelect)
    return (
      <Wrapper>
        <SelectedTitle>{name}</SelectedTitle>
        <InputWrapper>
          <IconButton {...decrement} aria-label="Decrease quantity" icon={<MinusIcon />} />
          <Input {...input} />
          <IconButton {...increment} aria-label="Increase quantity" icon={<AddIcon />} />
        </InputWrapper>
      </Wrapper>
    );
  else
    return (
      <Wrapper onClick={handleClick}>
        <UnSelectedTitle>{name}</UnSelectedTitle>
      </Wrapper>
    );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 12px 14px 16px;
  margin-bottom: 10px;
  border: 1px solid #ededed;
  border-radius: 2px;
`;

const SelectedTitle = styled.p`
  font-weight: 700;
  line-height: 22px;
  color: #111;
  word-wrap: break-word;
  word-break: break-all;
`;

const UnSelectedTitle = styled.p`
  font-weight: 700;
  line-height: 22px;
  color: #a4a4a4;
  word-wrap: break-word;
  word-break: break-all;
  cursor: default;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 8px;
  gap: 8px;
`;
