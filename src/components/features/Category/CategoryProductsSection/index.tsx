import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useGetProducts } from '@/api/hooks/useGetProducts';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { LoadingView } from '@/components/common/View/LoadingView';
import { VisibilityLoader } from '@/components/common/VisibilityLoader';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

type Props = {
  categoryId: string;
};

export const CategoryProductsSection = ({ categoryId }: Props) => {
  const { data, isError, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetProducts({
      categoryId,
    });

  // console.log('Fetched Data:', data);
  // console.log('isError:', isError);
  // console.log('isLoading:', isLoading);

  if (isLoading) return <LoadingView />;
  if (isError) return <TextView>에러가 발생했습니다.</TextView>;
  if (!data || !data.pages || !Array.isArray(data.pages))
    return <TextView>상품이 없어요.</TextView>;

  const flattenGoodsList = data.pages
    .flatMap((page) => page?.products ?? [])
    .filter((product) => product && product.id && product.name && product.price);

  console.log('Flatten Goods List:', flattenGoodsList);

  if (flattenGoodsList.length === 0) return <TextView>유효한 상품이 없어요.</TextView>;

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
          {flattenGoodsList.map(({ id, image_url, name, price }) => (
            <Link key={id} to={getDynamicPath.productsDetail(id)}>
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
        {hasNextPage && (
          <VisibilityLoader
            callback={() => {
              if (!isFetchingNextPage) {
                fetchNextPage();
              }
            }}
          />
        )}
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
