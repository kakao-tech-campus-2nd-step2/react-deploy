import React, { useState } from 'react';

import { useAddCategory } from '@/api/hooks/AddCategory'; // 올바른 경로로 설정

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <h1>카테고리 추가</h1>
      <input
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: '100%', marginBottom: '16px' }}
      />
      <input
        placeholder="색상"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={{ width: '100%', marginBottom: '16px' }}
      />
      <input
        placeholder="이미지 URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        style={{ width: '100%', marginBottom: '16px' }}
      />
      <input
        placeholder="설명"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: '100%', marginBottom: '16px' }}
      />
      <button
        onClick={handleAddCategory}
        style={{ width: '100%', padding: '8px 16px', backgroundColor: 'blue', color: 'white' }}
      >
        카테고리 추가
      </button>
    </div>
  );
};

export default CategoryAddPage;
