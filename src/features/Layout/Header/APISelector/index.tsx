import React from 'react';
import styled from '@emotion/styled';
import { useAPI } from '@context/api/useAPI';

export default function APISelector() {
  const { setBaseURL } = useAPI();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBaseURL(e.target.value);
  };

  return (
    <SelectorContainer name="name" id="api" onChange={handleChange}>
      <option value={process.env.REACT_APP_BASE_URL}>백엔드 API 선택</option>
      <option value={process.env.REACT_APP_HAE_GYEONG_BASE_URL}>김해경</option>
      <option value={process.env.REACT_APP_JEONG_HOON_BASE_URL}>유정훈</option>
      <option value={process.env.REACT_APP_EUN_KYOUNG_BASE_URL}>이은경</option>
    </SelectorContainer>
  );
}

const SelectorContainer = styled.select`
  font-weight: 500;
  font-size: 14px;
  margin-right: 24px;
`;
