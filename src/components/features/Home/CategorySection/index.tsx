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

  if (isLoading || isError) return null;
  if (!data) return null;
<<<<<<< HEAD
  console.log('Category data:', data); // 데이터 로깅
=======
>>>>>>> upstream/hehelee

  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 4,
            md: 6,
          }}
        >
<<<<<<< HEAD
          {data.map((category) =>
            category.id ? (
              <Link key={category.id} to={getDynamicPath.category(category.id.toString())}>
                <CategoryItem image={category.imageUrl} label={category.name} />
              </Link>
            ) : null,
          )}
=======
          {data.map((category) => (
            <Link key={category.id} to={getDynamicPath.category(category.id.toString())}>
              <CategoryItem image={category.imageUrl} label={category.name} />
            </Link>
          ))}
>>>>>>> upstream/hehelee
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
