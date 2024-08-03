import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
} from '@chakra-ui/react';
import Button from '@components/atoms/button/Button';
import FormTextInput from '@components/molecules/FormTextInput';
import { CategoryFormInputData } from '@/types';

function AddCategoryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormInputData>();

  const handleSubmitClick = useCallback((data: CategoryFormInputData) => {
    alert(`${data.name}을(를) 상품 목록에 추가했습니다.`);
  }, []);

  return (
    <Box width="400px" mx="auto" mt="50px">
      <form onSubmit={handleSubmit(handleSubmitClick)}>
        <FormTextInput<CategoryFormInputData>
          register={register}
          errors={errors}
          fieldKey="name"
          options={{
            required: '이름을 입력하세요.',
          }}
          fieldLabel="카테고리 이름"
        />

        <FormTextInput<CategoryFormInputData>
          register={register}
          errors={errors}
          fieldKey="description"
          options={{ required: '설명을 입력하세요', valueAsNumber: true }}
          fieldLabel="카테고리 설명"
        />

        <FormTextInput<CategoryFormInputData>
          register={register}
          errors={errors}
          fieldKey="imageUrl"
          options={{
            required: '이미지 URL을 입력하세요.',
          }}
          fieldLabel="이미지 URL"
        />

        <FormTextInput<CategoryFormInputData>
          register={register}
          errors={errors}
          fieldKey="color"
          options={{ required: '카테고리 배너 색상을 입력하세요' }}
          fieldLabel="색상 코드(16진수 또는 rgb(...))"
        />

        <Button theme="kakao" type="submit" text="테마 추가" elementSize="responsive" />
      </form>
    </Box>
  );
}

export default AddCategoryForm;
