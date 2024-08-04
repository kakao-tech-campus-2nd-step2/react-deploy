import { Flex, Spinner } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { useGetCategories } from '@/api/hooks/useGetCategorys';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

import { CategoryItem } from './CategoryItem';

export const CategorySection = () => {
  const { data, isLoading, isError } = useGetCategories();

  if (isLoading)
    return (
      <Flex width="100vw" height="240px" justifyContent="center" alignItems="center">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
      </Flex>
    );
  if (isError) return <div>카테고리 불러오기 실패</div>;
  if (!data) return null;

  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 4,
            md: 6,
          }}
        >
          {data.map((category) => (
            <Link key={category.id} to={getDynamicPath.category(category.id.toString())}>
              <CategoryItem image={category.imageUrl} label={category.name} />
            </Link>
          ))}
        </Grid>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 14px 14px 3px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 45px 52px 23px;
  }
`;
