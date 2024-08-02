import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
} from '@chakra-ui/react';
import Button from '@components/atoms/button/Button';
import FormTextInput from '@components/molecules/FormTextInput';
import { ProductFormInputData } from '@/types';

function AddProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormInputData>();

  const handleSubmitClick = useCallback((data: ProductFormInputData) => {
    alert(`${data.name}을(를) 카테고리 목록에 추가했습니다.`);
  }, []);

  return (
    <Box width="400px" mx="auto" mt="50px">
      <form onSubmit={handleSubmit(handleSubmitClick)}>
        <FormTextInput<ProductFormInputData>
          register={register}
          errors={errors}
          fieldKey="name"
          options={{
            required: '이름을 입력하세요.',
          }}
          fieldLabel="상품 이름"
        />

        <FormTextInput<ProductFormInputData>
          register={register}
          errors={errors}
          fieldKey="price"
          options={{ required: '가격을 입력하세요', valueAsNumber: true }}
          fieldLabel="가격(숫자)"
        />

        <FormTextInput<ProductFormInputData>
          register={register}
          errors={errors}
          fieldKey="imageUrl"
          options={{
            required: '이미지 URL을 입력하세요.',
          }}
          fieldLabel="이미지 URL"
        />

        <FormTextInput<ProductFormInputData>
          register={register}
          errors={errors}
          fieldKey="categoryId"
          options={{ required: '카테고리 ID를 입력하세요', valueAsNumber: true }}
          fieldLabel="카테고리 ID"
        />

        <Button theme="kakao" type="submit" text="상품 추가" elementSize="responsive" />
      </form>
    </Box>
  );
}

export default AddProductForm;
