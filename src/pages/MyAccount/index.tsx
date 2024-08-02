import styled from "@emotion/styled";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/common/Button";
import { Spacing } from "@/components/common/layouts/Spacing";
import { useAuth } from "@/provider/Auth";
import { RouterPath } from "@/routes/path";
import { authSessionStorage } from "@/utils/storage";

export interface WishItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}

export interface OrderItem {
  orderId: number;
  productId: number;
  productName: string;
  optionName: string;
  quantity: number;
  date: string;
  price: number;
  imageUrl: string;
}

export const MyAccountPage = () => {
  const authInfo = useAuth();
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [currentOrderPage, setCurrentOrderPage] = useState(0);
  const [hasNextOrderPage, setHasNextOrderPage] = useState(false);
  const [currentWishPage, setCurrentWishPage] = useState(0);
  const [totalWishPages, setTotalWishPages] = useState(0);
  const [points, setPoints] = useState(0); // 보유 포인트 상태 추가
  const [pointsToAdd, setPointsToAdd] = useState(0); // 충전할 포인트 상태 추가
  const pageSize = 5;

  const handleLogout = () => {
    authSessionStorage.set(undefined);
    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  const fetchWishes = useCallback(
    async (page: number) => {
      if (!authInfo) return;
      try {
        const response = await axios.get(
          `/api/wishes?page=${page}&size=${pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${authInfo.token}`,
            },
          }
        );
        setWishes(response.data.content);
        setTotalWishPages(response.data.totalPages);
      } catch (error) {
        console.error("Failed to fetch wishes", error);
      }
    },
    [authInfo, pageSize]
  );

  const fetchOrders = useCallback(
    async (page: number) => {
      if (!authInfo) return;
      try {
        const response = await axios.get(
          `/api/orders?page=${page}&size=${pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${authInfo.token}`,
            },
          }
        );
        setOrders(response.data.orders);
        setHasNextOrderPage(response.data.hasNext);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    },
    [authInfo, pageSize]
  );

  const fetchPoints = useCallback(async () => {
    if (!authInfo) return;
    try {
      const response = await axios.get("/api/points", {
        headers: {
          Authorization: `Bearer ${authInfo.token}`,
        },
      });
      setPoints(response.data.points);
    } catch (error) {
      console.error("Failed to fetch points", error);
    }
  }, [authInfo]);

  const addPoints = async () => {
    if (!authInfo) return;
    try {
      const response = await axios.post(
        "/api/points",
        { pointsToAdd },
        {
          headers: {
            Authorization: `Bearer ${authInfo.token}`,
          },
        }
      );
      setPoints(response.data.points);
      setPointsToAdd(0); // Reset input value after successful addition
    } catch (error) {
      console.error("Failed to add points", error);
    }
  };

  const deleteWish = async (wishId: number) => {
    if (!authInfo) return;
    try {
      await axios.delete(`/api/wishes/${wishId}`, {
        headers: {
          Authorization: `Bearer ${authInfo.token}`,
        },
      });
      setWishes(wishes.filter((wish) => wish.id !== wishId));
    } catch (error) {
      console.error("Failed to delete wish", error);
    }
  };

  useEffect(() => {
    fetchWishes(currentWishPage);
  }, [fetchWishes, currentWishPage]);

  useEffect(() => {
    fetchOrders(currentOrderPage);
  }, [fetchOrders, currentOrderPage]);

  useEffect(() => {
    fetchPoints(); // 보유 포인트 조회
  }, [fetchPoints]);

  return (
    <Wrapper>
      {authInfo?.name}님 안녕하세요! <Spacing height={64} />
      <Button
        size="small"
        theme="darkGray"
        onClick={handleLogout}
        style={{
          maxWidth: "200px",
        }}
      >
        로그아웃
      </Button>
      <Spacing height={64} />
      <ContentWrapper>
        <Section>
          <h2>보유 포인트</h2>
          <p>{points}점</p> {/* 보유 포인트 표시 */}
          <Spacing height={32} />
          <h2>포인트 충전</h2>
          <input
            type="number"
            value={pointsToAdd}
            onChange={(e) => setPointsToAdd(Number(e.target.value))}
            placeholder="충전할 포인트 입력"
          />
          <button onClick={addPoints}>충전</button>
          <Spacing height={32} />
        </Section>
        <Section>
          <h2>관심 목록</h2>
          <WishList>
            {wishes.map((wish) => (
              <WishListItem key={wish.id}>
                <img src={wish.product.imageUrl} alt={wish.product.name} />
                <div>
                  <h3>{wish.product.name}</h3>
                  <p>{wish.product.price}원</p>
                  <button onClick={() => deleteWish(wish.id)}>삭제</button>
                </div>
              </WishListItem>
            ))}
          </WishList>
          <Pagination>
            {Array.from({ length: totalWishPages }, (_, index) => (
              <PageButton
                key={index}
                onClick={() => setCurrentWishPage(index)}
                active={index === currentWishPage}
              >
                {index + 1}
              </PageButton>
            ))}
          </Pagination>
        </Section>
        <Section>
          <h2>주문 목록</h2>
          <OrderList>
            {orders.map((order) => (
              <OrderListItem key={order.orderId}>
                <img src={order.imageUrl} alt={order.productName} />
                <div>
                  <h3>{order.productName}</h3>
                  <p>{order.optionName}</p>
                  <p>{order.quantity}개</p>
                  <p>{order.price}원</p>
                  <p>{order.date}</p>
                </div>
              </OrderListItem>
            ))}
          </OrderList>
          <Pagination>
            <PageButton
              onClick={() =>
                setCurrentOrderPage((prev) => Math.max(prev - 1, 0))
              }
              disabled={currentOrderPage === 0}
            >
              이전
            </PageButton>
            <PageButton
              onClick={() => setCurrentOrderPage((prev) => prev + 1)}
              disabled={!hasNextOrderPage}
            >
              다음
            </PageButton>
          </Pagination>
        </Section>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 80px 0 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 36px;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1024px;
`;

const Section = styled.div`
  flex: 1;
  margin: 0 20px;
`;

const WishList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const WishListItem = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  width: 100%;

  img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }

  h3 {
    margin: 0;
    font-size: 18px;
  }

  p {
    margin: 0;
    color: #888;
    font-size: 16px;
  }

  button {
    width: 50px;
    height: 30px;
    font-size: 14px;
    background-color: rgb(255, 200, 200);
    border-radius: 10px;
  }
`;

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const OrderListItem = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  width: 100%;

  img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }

  h3 {
    margin: 0;
    font-size: 18px;
  }

  p {
    margin: 0;
    color: #888;
    font-size: 16px;
  }
`;

const Pagination = styled.div`
  margin-top: 20px;
  display: flex;
`;

const PageButton = styled.button<{ active?: boolean }>`
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  width: 40px;
  height: 40px;
  font-size: 16px;
  border-radius: 10px;
  background-color: ${({ active }) => (active ? "#333" : "#f5f5f5")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
  cursor: pointer;

  &:hover {
    background-color: #000;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;
