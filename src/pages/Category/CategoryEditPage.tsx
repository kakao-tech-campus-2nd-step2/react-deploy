import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useUpdateCategory } from '@/api/hooks/useUpdateCategory';
import { fetchInstance } from '@/api/instance';

interface Category {
  name: string;
  color: string;
  imageUrl: string;
  description: string;
}

const CategoryEditPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<Category>({ name: '', color: '', imageUrl: '', description: '' });
  const { mutate: updateCategory } = useUpdateCategory();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetchInstance.get<Category>(`/api/categories/${categoryId}`);
        setCategory(response.data);
      } catch (err) {
        setError('Failed to fetch category');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleUpdateCategory = () => {
    if (!categoryId) return;
    updateCategory({ categoryId, category });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <h1>카테고리 수정</h1>
      <input
        placeholder="이름"
        value={category.name}
        onChange={(e) => setCategory({ ...category, name: e.target.value })}
        style={{ width: '100%', marginBottom: '16px' }}
      />
      <input
        placeholder="색상"
        value={category.color}
        onChange={(e) => setCategory({ ...category, color: e.target.value })}
        style={{ width: '100%', marginBottom: '16px' }}
      />
      <input
        placeholder="이미지 URL"
        value={category.imageUrl}
        onChange={(e) => setCategory({ ...category, imageUrl: e.target.value })}
        style={{ width: '100%', marginBottom: '16px' }}
      />
      <input
        placeholder="설명"
        value={category.description}
        onChange={(e) => setCategory({ ...category, description: e.target.value })}
        style={{ width: '100%', marginBottom: '16px' }}
      />
      <button
        onClick={handleUpdateCategory}
        style={{ width: '100%', padding: '8px 16px', backgroundColor: 'blue', color: 'white' }}
      >
        카테고리 수정
      </button>
    </div>
  );
};

export default CategoryEditPage;
