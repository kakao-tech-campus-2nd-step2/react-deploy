import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

import { useGetProducts } from '@/api/hooks/useGetProducts';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { LoadingView } from '@/components/common/View/LoadingView';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

type CategoryProductsSectionProps = {
  categoryId: number;
};

export const CategoryProductsSection = ({ categoryId }: CategoryProductsSectionProps) => {
  const { categoryProducts, status, error, fetchNextPage, hasNextPage } =
    useGetProducts({ categoryId });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === 'pending') return <LoadingView />;

  if (error) return <TextView>에러가 발생했습니다.</TextView>;

  if (!categoryProducts?.length) return <TextView>상품이 없어요.</TextView>;

  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 2,
            md: 4,
          }}
          gap={16}
        >
          {categoryProducts.map(({ id, image_url, name, price }, index) => (
            <Link key={id} to={getDynamicPath.productsDetail(id)} ref={categoryProducts.length === index + 1 ? ref : undefined}>
              <DefaultGoodsItems
                key={id}
                imageSrc={image_url}
                title={name}
                amount={price}
                subtitle={''}
              />
            </Link>
          ))}
        </Grid>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;

const TextView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;
