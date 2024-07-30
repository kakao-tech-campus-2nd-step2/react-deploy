import React from 'react';
import styled from '@emotion/styled';
import { Container, Image } from '@components/common';

const IMAGE_SIZE = 90;
const IMAGE_RADIUS = 32;

export interface CategoryItemProps {
  imageUrl: string;
  name: string;
}

export default function CategoryItem({ imageUrl, name }: CategoryItemProps) {
  return (
    <ThemeItemContainer>
      <Container flexDirection="column" alignItems="center">
        <Image src={imageUrl} width={IMAGE_SIZE} height={IMAGE_SIZE} radius={IMAGE_RADIUS} alt={name} />
        <CategoryName>{name}</CategoryName>
      </Container>
    </ThemeItemContainer>
  );
}

const ThemeItemContainer = styled.div`
  padding: 25px 35px;
  cursor: pointer;
`;

const CategoryName = styled.p`
  padding-top: 7px;
`;
