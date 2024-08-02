import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { LoadingView } from '@/components/common/View/LoadingView';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import { fetchInstance } from '@/api/instance';

type Props = {
  categoryId: string;
};

type ProductData = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  categoryId?: number;
};

export const CategoryProductsSection = ({ categoryId }: Props) => {
  const token = 'example'; // 

  const { data, isError, error, isLoading } = useQuery<ProductData[]>({
    queryKey: ['products', categoryId],
    queryFn: async () => {
      try {
        const response = await fetchInstance.get(`/api/products`, {
          params: { categoryId },
          headers: {
            Authorization: `Bearer ${token}`, // 필요 시 토큰 추가
          },
        });

        return response.data; 
      } catch (error) {
        console.error('Failed to fetch products:', error);
        throw new Error('Failed to fetch products');
      }
    },
  });

  if (isLoading) return <LoadingView />;
  if (isError) {
    console.error(error);
    return <TextView>에러가 발생했습니다.</TextView>;
  }

  if (!data || data.length === 0) return <TextView>상품이 없어요.</TextView>;

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
          {data.map(({ id, imageUrl, name, price }) => (
            <Link key={id} to={getDynamicPath.productsDetail(id)}>
              <DefaultGoodsItems
                key={id}
                imageSrc={imageUrl}
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
