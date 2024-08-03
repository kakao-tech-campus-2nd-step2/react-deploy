import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { CenteredContainer } from '@components/common';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@routes/path';
import { CategoryLocationState } from '@internalTypes/dataTypes';

export default function CategoryHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as CategoryLocationState | null;

  useEffect(() => {
    if (!state) navigate(ROUTE_PATH.HOME);
  }, [state, navigate]);

  if (!state) return null;
  const { name, color, description } = state;

  return (
    <CategoryHeaderContainer color={color}>
      <CenteredContainer maxWidth="md">
        <Label>{name}</Label>
        <Title>{name}</Title>
        <Description>{description}</Description>
      </CenteredContainer>
    </CategoryHeaderContainer>
  );
}

const CategoryHeaderContainer = styled.section<{ color?: string }>`
  margin-top: 60px;
  background-color: ${({ color }) => color};
  padding: 50px 0;
`;

const Label = styled.p`
  font-size: 20px;
  color: #ffffffb3;
  font-weight: 700;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 700;
  color: #fff;
  padding-top: 12px;
`;

const Description = styled.p`
  font-size: 24px;
  color: #ffffff8c;
  padding-top: 12px;
`;
