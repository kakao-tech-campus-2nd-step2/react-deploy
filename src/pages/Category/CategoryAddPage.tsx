import { Box, Button, Center, Heading,Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

import { useAddCategory } from '@/api/hooks/AddCategory'; 

const CategoryAddPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const { mutate: addCategory } = useAddCategory();

  const handleAddCategory = () => {
    if (!name || !color || !imageUrl || !description) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    addCategory({ name, color, imageUrl, description });
  };

  return (
    <Center height="100vh">
      <Box>
        <VStack spacing={4}>
          <Heading size="lg">카테고리 추가</Heading>
          <Input
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="색상"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <Input
            placeholder="이미지 URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <Input
            placeholder="설명"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button backgroundColor="#FEE500" color="black" onClick={handleAddCategory}>
            카테고리 추가
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default CategoryAddPage;
