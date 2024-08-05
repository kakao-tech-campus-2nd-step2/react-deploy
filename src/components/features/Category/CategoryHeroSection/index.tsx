import styled from '@emotion/styled';

import { Container } from '@/components/common/layouts/Container';
import { useCurrentCategory } from '@/hooks/useCurrentCategory';
import { breakpoints } from '@/styles/variants';
import type { CategoryData } from '@/types';

type Props = {
  category_id: string;
};

export const CategoryHeroSection = ({ category_id }: Props) => {
  const { isRender, currentTheme } = useCurrentCategory({ category_id });

  if (!isRender) return null;

  if (!currentTheme) {
    return null;
  }

  const { color, name, description } = currentTheme;

  return (
    <Wrapper backgroundColor={color}>
      <Container>
        <Label>{name}</Label>
        <Title>{description}</Title>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section<{ backgroundColor: string }>`
  padding: 27px 20px 23px;
  width: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor};

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 50px 20px;
  }
`;

const Label = styled.p`
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.7);

  @media screen and (min-width: ${breakpoints.sm}) {
    font-size: 20px;
    line-height: 24px;
  }
`;

const Title = styled.h1`
  font-weight: 700;
  color: #fff;
  font-size: 18px;
  line-height: 26px;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;

  @media screen and (min-width: ${breakpoints.sm}) {
    font-size: 30px;
    line-height: 40px;
    padding-top: 12px;
    word-break: break-word;
  }
`;

export const getCurrentCategory = (category_id: string, categoryList: CategoryData[]) => {
  return categoryList.find((category) => category.id.toString() === category_id);
};
