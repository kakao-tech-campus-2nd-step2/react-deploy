import { Select } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';

import type { ProductOptionsResponseData } from '@/api/hooks/useGetProductOptions';
import type { ProductOptionsData } from '@/types';

interface OptionSelectProps {
  options: ProductOptionsResponseData;
}

export const OptionSelect = ({ options }: OptionSelectProps) => {
  const { control, setValue, watch } = useFormContext();

  // Watch the current selected option id
  const selectedOptionId = watch('optionSelectId');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedOption = options.find((option) => option.id === parseInt(selectedId));
    setValue('optionSelectId', selectedId); // Update only the id
    setValue('optionSelect', selectedOption); // Set the entire option object
  };

  return (
    <Wrapper>
      <Title>옵션</Title>
      <Controller
        name="optionSelectId"
        control={control}
        render={({ field }) => (
          <Select {...field} placeholder="옵션을 선택하세요" onChange={handleChange} value={selectedOptionId || ''}>
            {options.map((option: ProductOptionsData) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </Select>
        )}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 12px 14px 16px;
  border: 1px solid #ededed;
  border-radius: 2px;
`;

const Title = styled.p`
  font-weight: 700;
  line-height: 22px;
  color: #111;
  word-wrap: break-word;
  word-break: break-all;
`;
