import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
} from '@chakra-ui/react';
import Button from '@components/atoms/button/Button';
import NameAdditionForm from '@components/organisms/admin/NameAdditionForm';
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
        <NameAdditionForm additionType="category" register={register} errors={errors} />

        <FormControl isInvalid={!!errors.price} mb="4">
          <FormLabel htmlFor="price">가격</FormLabel>
          <Input
            id="price"
            type="number"
            placeholder="가격"
            {...register('price', { required: '가격을 입력하세요', valueAsNumber: true })}
          />
          {errors.price && <Text color="red.500" fontSize="sm">{errors.price.message}</Text>}
        </FormControl>

        <FormControl isInvalid={!!errors.imageUrl} mb="4">
          <FormLabel htmlFor="imageUrl">이미지 URL</FormLabel>
          <Input
            id="imageUrl"
            placeholder="상품 이미지 URL"
            {...register('imageUrl', { required: '이미지 url을 입력하세요' })}
          />
          {errors.imageUrl && <Text color="red.500" fontSize="sm">{errors.imageUrl.message}</Text>}
        </FormControl>

        <FormControl isInvalid={!!errors.categoryId} mb="4">
          <FormLabel htmlFor="categoryId">카테고리 ID</FormLabel>
          <Input
            id="categoryId"
            type="number"
            placeholder="카테고리 ID"
            {...register('categoryId', { required: '카테고리 ID를 입력하세요', valueAsNumber: true })}
          />
          {errors.categoryId && <Text color="red.500" fontSize="sm">{errors.categoryId.message}</Text>}
        </FormControl>

        <Button theme="kakao" type="submit" text="상품 추가" elementSize="responsive" />
      </form>
    </Box>
  );
}

export default AddProductForm;
