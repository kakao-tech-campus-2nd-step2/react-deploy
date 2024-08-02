import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { useGetProducts } from '@/api/hooks/useGetProducts';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { LoadingView } from '@/components/common/View/LoadingView';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

type Props = {
  category_id: number;
};

export const CategoryProductsSection = ({ category_id }: Props) => {
  const { data, error, isLoading } = useGetProducts(category_id);

  if (isLoading) return <LoadingView />;
  if (error) return <TextView>에러가 발생했습니다.</TextView>;
  console.log('data: ' + JSON.stringify(data));

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
          {data &&
            data.map((product) => (
              <Link key={product.id} to={getDynamicPath.productsDetail(product.id)}>
                <DefaultGoodsItems
                  imageSrc={product.imageUrl}
                  name={product.name}
                  price={parseInt(product.price, 10)}
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
