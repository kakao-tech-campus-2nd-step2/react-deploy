import { FieldErrors, UseFormRegister } from 'react-hook-form';
import {
  FormControl, FormLabel, Input, Text,
} from '@chakra-ui/react';
import { CategoryFormInputData, ProductFormInputData } from '@/types';

interface NameAdditionFormProps {
  additionType: 'product' | 'category';
  register: any;
  errors: FieldErrors<ProductFormInputData | CategoryFormInputData>;
}

function NameAdditionForm({ register, additionType, errors }: NameAdditionFormProps) {
  return (
    <FormControl isInvalid={!!errors.name} mb="4">
      <FormLabel htmlFor="name">
        {additionType === 'product' ? '상품' : '카테고리'}
        {' '}
        이름
      </FormLabel>
      <Input
        id="name"
        placeholder="카테고리명"
        {...register('name', { required: '이름을 입력하세요' })}
      />
      {errors.name && <Text color="red.500" fontSize="sm">{errors.name.message}</Text>}
    </FormControl>
  );
}

export default NameAdditionForm;
