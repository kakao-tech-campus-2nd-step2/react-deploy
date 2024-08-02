import { Box, Image,List, ListItem, Spinner, Text } from '@chakra-ui/react';
import React from 'react';

import { useGetCategories } from '@/api/hooks/useGetCategorys'; // 정확한 경로로 설정하세요

const CategoryList: React.FC = () => {
  const { data: categories, isLoading, error } = useGetCategories();

  if (isLoading) return <Spinner />;
  if (error) return <p>Error loading categories: {error.message}</p>;

  return (
    <Box>
      <Text fontSize="2xl" mb={4}>카테고리 목록</Text>
      <List spacing={3}>
        {categories && categories.map(category => (
          <ListItem key={category.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
            <Box>
              <Image src={category.imageUrl} alt={category.name} boxSize="100px" objectFit="cover" />
            </Box>
            <Box mt={2}>
              <Text fontWeight="bold">{category.name}</Text>
              <Text>{category.color}</Text>
              <Text>{category.description}</Text>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CategoryList;
