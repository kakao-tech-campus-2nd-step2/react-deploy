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

type CategoryFormInputData = {
  name: string;
  color: string;
  imageUrl: string;
  description: string;
};

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
        <FormControl isInvalid={!!errors.name} mb="4">
          <FormLabel htmlFor="name">카테고리 이름</FormLabel>
          <Input
            id="name"
            placeholder="카테고리명"
            {...register('name', { required: '이름을 입력하세요' })}
          />
          {errors.name && <Text color="red.500" fontSize="sm">{errors.name.message}</Text>}
        </FormControl>

        <FormControl isInvalid={!!errors.color} mb="4">
          <FormLabel htmlFor="color">배너 배경 색상</FormLabel>
          <Input
            id="color"
            placeholder="16진수 또는 rgba"
            {...register('color', { required: '색상을 입력하세요' })}
          />
          {errors.color && <Text color="red.500" fontSize="sm">{errors.color.message}</Text>}
        </FormControl>

        <FormControl isInvalid={!!errors.imageUrl} mb="4">
          <FormLabel htmlFor="imageUrl">이미지 URL</FormLabel>
          <Input
            id="imageUrl"
            placeholder="카테고리 이미지 URL"
            {...register('imageUrl', { required: '이미지 url을 입력하세요' })}
          />
          {errors.imageUrl && <Text color="red.500" fontSize="sm">{errors.imageUrl.message}</Text>}
        </FormControl>

        <FormControl isInvalid={!!errors.description} mb="4">
          <FormLabel htmlFor="description">설명</FormLabel>
          <Input
            id="description"
            placeholder="설명을 입력하세요"
            {...register('description', { required: '설명을 입력하세요' })}
          />
          {errors.description && <Text color="red.500" fontSize="sm">{errors.description.message}</Text>}
        </FormControl>

        <Button theme="kakao" type="submit" text="테마 추가" elementSize="responsive" />
      </form>
    </Box>
  );
}

export default AddCategoryForm;
