import { useEffect, useState } from 'react';
import { BASE_URL } from '@/api/instance';

type Order = {
  id: number;
  optionId: number;
  quantity: number;
  orderDateTime: string;
  message: string;
};

export const OrderedListPage = () => {
    const [orders, setOrders] = useState<Order[]>([]); // 타입을 명시적으로 지정

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/orders?page=0&size=10&sort=orderDateTime,desc`);
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                } else {
                    alert('주문 목록을 불러오는 데 실패했습니다.');
                }
            } catch (error) {
                console.error('주문 목록 불러오기 오류: ', error);
                alert('주문 목록을 불러오는 중 오류가 발생했습니다.');
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <h1>주문 목록</h1>
            <ul>
                {orders.map((order) => (
                    <li key={order.id}>
                        {order.orderDateTime} - {order.message} ({order.quantity}개)
                    </li>
                ))}
            </ul>
        </div>
    );
};
