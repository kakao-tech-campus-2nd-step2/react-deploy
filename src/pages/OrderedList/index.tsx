import React, { useState } from 'react';
import { useOrderList } from '@/api/hooks/useOrderList';

import { Button as ChakraButton, Divider } from '@chakra-ui/react';
import styled from '@emotion/styled';


export const OrderList = () => {
  const [page, setPage] = useState(0);
  const { orders, loading, error } = useOrderList({ page, size: 10 });


  if (loading) return <LoadingMessage>Loading...</LoadingMessage>;
  if (error) return <ErrorMessage>Error: {error.message}</ErrorMessage>;

  return (
    <Wrapper>
      <Title>주문 목록</Title>
      <Divider />
      {orders.length === 0 ? (
        <EmptyMessage>주문이 없습니다.</EmptyMessage>
      ) : (
        <OrderListContainer>
          {orders.map((order) => (
            <OrderItem key={order.id}>
              <OrderDetail>
                <strong>주문 번호:</strong> {order.id}
              </OrderDetail>
              <OrderDetail>
                <strong>옵션 ID:</strong> {order.optionId}
              </OrderDetail>
              <OrderDetail>
                <strong>수량:</strong> {order.quantity}
              </OrderDetail>
              <OrderDetail>
                <strong>주문 날짜:</strong> {order.orderDateTime}
              </OrderDetail>
              <OrderDetail>
                <strong>메시지:</strong> {order.message}
              </OrderDetail>
              <Divider />
            </OrderItem>
          ))}
        </OrderListContainer>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Arial, sans-serif';
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
`;

const OrderListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const OrderItem = styled.li`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
`;

const OrderDetail = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
  color: #333;

  strong {
    font-weight: 600;
    color: #000;
  }
`;

const LoadingMessage = styled.div`
  font-size: 18px;
  text-align: center;
  padding: 40px 0;
`;

const ErrorMessage = styled.div`
  font-size: 18px;
  text-align: center;
  color: red;
  padding: 40px 0;
`;

const EmptyMessage = styled.div`
  font-size: 18px;
  text-align: center;
  color: #777;
  padding: 40px 0;
`;

export default OrderList;

