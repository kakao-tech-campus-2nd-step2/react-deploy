import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth';
import { fetchWishlist, deleteWish } from '@/api/hooks/useWish';
import { authSessionStorage } from '@/utils/storage';
import { useNavigate } from 'react-router-dom';
import { RouterPath } from '@/routes/path';

export const MyAccountPage = () => {
  const authInfo = useAuth();
  const [wishList, setWishList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleLogout = () => {
    authSessionStorage.set(undefined);
    window.location.replace('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      if (authInfo?.token) {
        try {
          console.log(authInfo.token);
          const data = await fetchWishlist(authInfo.token);
          console.log(data);
          setWishList(data);
        } catch (error) {
          console.error('Failed to fetch wishlist', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [authInfo]);

  useEffect(() => {
    console.log('Updated wishlist:', wishList);
  }, [wishList]);

  const handleRemoveWish = async (productId: number) => {
    if (authInfo?.token) {
      try {
        console.log(productId);
        await deleteWish(productId, authInfo.token);
        setWishList((prev) => prev.filter((wish) => wish.product.id !== productId));
      } catch (error) {
        console.error('Failed to remove wish', error);
      }
    }
    window.location.reload();
  };

  if (loading) return <div>Loading...</div>;

  

  return (
    <Wrapper>
      {authInfo?.name}님 안녕하세요! <Spacing height={64} />
      <Button
        size="small"
        theme="darkGray"
        onClick={handleLogout}
        style={{
          maxWidth: '200px',
        }}
      >
        로그아웃
      </Button>
      <button onClick={() => navigate(RouterPath.orders)}>주문목록으로 이동하기</button>
      <Spacing height={32} />
      <div>위시리스트</div>
      {wishList && wishList.length > 0 ? (
        <WishListContainer>
          {wishList.map((item) => (
            <WishItem key={item.id}>
              <WishImage src={item.product.imageUrl} alt={item.product.name} />
              <WishDetails>
                <WishName>{item.product.name}</WishName>
                <WishPrice>{item.product.price}원</WishPrice>
                <RemoveButton onClick={() => handleRemoveWish(item.product.id)}>삭제</RemoveButton>
              </WishDetails>
            </WishItem>
          ))}
        </WishListContainer>
      ) : (
        <EmptyMessage>관심등록상품이 없어요</EmptyMessage>
      )}
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

const WishListContainer = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const WishItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 8px;
`;

const WishImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const WishDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const WishName = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin: 0;
`;

const WishPrice = styled.p`
  font-size: 18px;
  color: #555;
  margin: 0;
`;

const RemoveButton = styled.button`
  font-size: 14px;
  color: #ff0000;
  background: none;
  border: none;
  cursor: pointer;
`;

const EmptyMessage = styled.p`
  font-size: 24px;
  color: #777;
`;

export default MyAccountPage;
