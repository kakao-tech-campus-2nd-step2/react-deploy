import { Box, Button, Center, Heading, Input, VStack  } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useUpdateCategory } from '@/api/hooks/useUpdateCategory';
import { fetchInstance } from '@/api/instance';

interface Category {
  id: string;
  name: string;
  color: string;
  imageUrl: string;
  description: string;
}

const CategoryEditPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const { mutate: updateCategory } = useUpdateCategory();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetchInstance.get<Category[]>(`/api/categories`);
        const currentCategory = response.data.find(cat => cat.id.toString() === categoryId);
        if (currentCategory) {
          setCategory(currentCategory);
        } else {
          setError('Category not found');
        }
      } catch (err) {
        setError('Failed to fetch category');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleUpdateCategory = () => {
    if (!category || !categoryId) return;
    updateCategory({ categoryId, category });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
<Center height="100vh">
      <Box>
        <VStack spacing={4}>
          <Heading size="lg">카테고리 수정</Heading>
          <Input
            placeholder="이름"
            value={category.name}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
          />
          <Input
            placeholder="색상"
            value={category.color}
            onChange={(e) => setCategory({ ...category, color: e.target.value })}
          />
          <Input
            placeholder="이미지 URL"
            value={category.imageUrl}
            onChange={(e) => setCategory({ ...category, imageUrl: e.target.value })}
          />
          <Input
            placeholder="설명"
            value={category.description}
            onChange={(e) => setCategory({ ...category, description: e.target.value })}
          />
          <Button backgroundColor="#FEE500" color="black" onClick={handleUpdateCategory}>
            카테고리 수정
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default CategoryEditPage;
