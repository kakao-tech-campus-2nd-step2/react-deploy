import { Select } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

import type { ProductOptionsResponseData } from '@/api/hooks/useGetProductOptions';
import type { ProductOptionsData } from '@/types';

type OptionSelectorProps = {
  options: ProductOptionsResponseData;
};

export const OptionSelector = ({ options }: OptionSelectorProps) => {
  const { control, setValue, watch } = useFormContext();

  const watchedOptionId = watch('optionId');

  const handleSelector = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptionId = parseInt(e.target.value, 10);
    const selectedOption = options.find((opt) => opt.id === selectedOptionId);

    // 컨트롤러의 optionId 필드 값을 selectedOptionId 로 변경
    setValue('optionId', selectedOptionId);

    // OptionSection 에서 사용할 selectedOption 값을 변경
    setValue('optionSelect', selectedOption);
  }

  return (
    <Controller
      name="optionId"
      control={control}
      render={({ field }) => (
        <Select {...field} onChange={handleSelector} value={watchedOptionId || ''}>
          {options.map((option: ProductOptionsData) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </Select>
      )}
    />
  );
};