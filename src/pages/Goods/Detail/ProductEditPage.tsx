import { Button, Center,Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useUpdateProduct } from '@/api/hooks/useUpdateProduct';
import { fetchInstance } from '@/api/instance';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  categoryId: number;
}

const ProductEditPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { mutate: updateProduct } = useUpdateProduct();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetchInstance.get<Product>(`/api/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to fetch product');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleUpdateProduct = () => {
    if (!product || !productId) return;
    updateProduct({ productId, product });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Center height="100vh">
      <VStack spacing={4}>
        <Input
          placeholder="상품명"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
        <Input
          placeholder="가격"
          type="number"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
        />
        <Input
          placeholder="이미지 URL"
          value={product.imageUrl}
          onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
        />
        <Input
          placeholder="카테고리 ID"
          type="number"
          value={product.categoryId}
          onChange={(e) => setProduct({ ...product, categoryId: Number(e.target.value) })}
        />
        <Button colorScheme="blue" onClick={handleUpdateProduct}>
          상품 수정
        </Button>
      </VStack>
    </Center>
  );
};

export default ProductEditPage;
