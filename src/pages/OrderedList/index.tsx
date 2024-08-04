import React, { useState } from 'react';
import { useOrderList } from '@/api/hooks/useOrderList';
import { Button } from '@/components/common/Button';
import { Divider } from '@chakra-ui/react';

export const OrderList = () => {
  const [page, setPage] = useState(0);
  const { orders, loading, error } = useOrderList({ page, size: 10 });

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 0));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>주문 목록</h2>
      <Divider />
      {orders.length === 0 ? (
        <p>주문이 없습니다.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <div>
                <strong>주문 번호:</strong> {order.id}
              </div>
              <div>
                <strong>옵션 ID:</strong> {order.optionId}
              </div>
              <div>
                <strong>수량:</strong> {order.quantity}
              </div>
              <div>
                <strong>주문 날짜:</strong> {order.orderDateTime}
              </div>
              <div>
                <strong>메시지:</strong> {order.message}
              </div>
              <Divider />
            </li>
          ))}
        </ul>
      )}
      <div>
        <Button onClick={handlePrevPage} disabled={page === 0}>
          이전 페이지
        </Button>
        <Button onClick={handleNextPage} disabled={orders.length < 10}>
          다음 페이지
        </Button>
      </div>
    </div>
  );
};
