import styled from '@emotion/styled';

import { useGetOrderList } from '@/api/hooks/useGetOrderList';
import { Container } from '@/components/common/layouts/Container';
import { LoadingView } from '@/components/common/View/LoadingView';
import { DefaultOrderItem } from '@/components/features/OrderList/DefaultOrderItem';

export const OrderListPage = () => {
  const { data, isError, isLoading } = useGetOrderList({ maxResults: 10, initPageToken: '0' });

  if (isLoading) return <LoadingView />;
  if (isError) return <TextView>에러가 발생했습니다.</TextView>;
  if (!data) return <></>;
  if (data.pages[0].products.length <= 0) return <TextView>주문 내역이 없어요.</TextView>;
  const flattenOrderList = data.pages.map((page) => page?.products ?? []).flat();

  const groupedOrders = flattenOrderList.reduce(
    (acc, product) => {
      const date = product.orderDateTime;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(product);
      return acc;
    },
    {} as Record<string, typeof flattenOrderList>,
  );

  return (
    <Wrapper>
      <Title>주문 내역</Title>
      <ColorContainer>
        {Object.keys(groupedOrders).map((date) => (
          <DateMap key={date}>
            <DateTime>
              주문일 <span>{date}</span>
            </DateTime>
            <CustomContainer maxWidth="1024px">
              {groupedOrders[date].map((product, index) => (
                <div key={index} className="orderitem">
                  <DefaultOrderItem
                    imageSrc={product.imageUrl}
                    title={product.name}
                    amount={product.price}
                    quantity={product.quantity}
                  />
                </div>
              ))}
            </CustomContainer>
          </DateMap>
        ))}
      </ColorContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 36px;
`;
const ColorContainer = styled(Container)`
  background-color: #f3f3f3;
  padding-top: 50px;
`;
const Title = styled.h4`
  text-align: center;
  margin: 20px;
  font-size: 20px;
  font-weight: bold;
`;
const CustomContainer = styled(Container)`
  padding: 10px;

  .orderitem {
    width: 100%;
    display: flex;

    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.02);
    flex-direction: column;
  }
`;
const DateMap = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;
const TextView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;

const DateTime = styled.h2`
  width: 100%;
  font-size: 18px;
  line-height: 22px;
  font-weight: 400;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  span {
    font-weight: bold;
  }
`;
