import React from 'react';
import styled from '@emotion/styled';

export default function APISelector() {
  return (
    <SelectorContainer name="name" id="api">
      <option value={process.env.REACT_APP_EUN_KYOUNG_BASE_URL}>이은경</option>
      <option value={process.env.REACT_APP_HAE_GYEONG_BASE_URL}>김해경</option>
    </SelectorContainer>
  );
}

const SelectorContainer = styled.select`
  font-weight: 500;
  font-size: 14px;
  margin-right: 24px;
`;
