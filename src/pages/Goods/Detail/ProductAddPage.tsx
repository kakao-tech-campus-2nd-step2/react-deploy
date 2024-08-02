import { Button, Center, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

import { useAddProduct } from '@/api/hooks/useAddProduct';

const AddProductPage: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [optionName, setOptionName] = useState('');
  const [optionQuantity, setOptionQuantity] = useState('');
  const { mutate: addProduct } = useAddProduct();

  const handleAddProduct = () => {
    if (!name || !price || !imageUrl || !categoryId || !optionName || !optionQuantity) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const newProduct = {
      name,
      price: parseInt(price, 10),
      imageUrl,
      categoryId: parseInt(categoryId, 10),
      options: [
        {
          name: optionName,
          quantity: parseInt(optionQuantity, 10),
        },
      ],
    };

    addProduct(newProduct);
  };

  return (
    <Center height="100vh">
      <VStack spacing={4}>
        <h1>상품 추가</h1>
        <Input placeholder="상품명" value={name} onChange={(e) => setName(e.target.value)} />
        <Input
          placeholder="가격"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          placeholder="이미지 URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <Input
          placeholder="카테고리 ID"
          type="number"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        />
        <Input
          placeholder="옵션 이름"
          value={optionName}
          onChange={(e) => setOptionName(e.target.value)}
        />
        <Input
          placeholder="옵션 수량"
          type="number"
          value={optionQuantity}
          onChange={(e) => setOptionQuantity(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleAddProduct}>
          상품 추가
        </Button>
      </VStack>
    </Center>
  );
};

export default AddProductPage;
