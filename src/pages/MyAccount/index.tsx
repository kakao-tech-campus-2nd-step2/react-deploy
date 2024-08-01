import styled from '@emotion/styled';

import { useDeleteWish } from '@/api/hooks/useDeleteWish';
import { useGetWishList } from '@/api/hooks/useGetWishList';
import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { Spacing } from '@/components/common/layouts/Spacing';
import { LoadingView } from '@/components/common/View/LoadingView';
import { useAuth } from '@/provider/Auth/AuthContext';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

export const MyAccountPage = () => {
  const authInfo = useAuth();

  const { wishList, error, loading } = useGetWishList();
  const { deleteWish } = useDeleteWish();

  if (loading) return <LoadingView />;
  if (error) return <TextView>에러가 발생했습니다.</TextView>;
  if (wishList && wishList.length <= 0) return <TextView>상품이 없어요.</TextView>;

  const handleDeleteWish = async (productId: string) => {
    const response = await deleteWish(productId);

    if (response === 200) {
      alert('위시 상품에서 삭제되었습니다.');
      window.location.reload();
    } else {
      alert(response);
    }
  }

  const handleLogout = () => {
    authSessionStorage.set(undefined);

    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  return (
    <Wrapper>
      {authInfo?.name}님 안녕하세요! <Spacing height={64} />
      <WishWrapper>
        <WishTitle>{authInfo?.name}님의 위시리스트</WishTitle>
        <Container>
          <Grid
            columns={{
              initial: 2,
              md: 1,
            }}
            gap={16}
          >
            {wishList ? wishList.map(({ productId, imageUrl, productName, price }) => (
              <WishContentWrapper style={{ height: "115px" }}>
                <img src={imageUrl} alt="" />
                <WishInfo key={productId}>
                  <WishProduct>{productName}</WishProduct>
                  <WishPrice>{price}</WishPrice>
                </WishInfo>
                <Button onClick={() => handleDeleteWish(productId?.toString())} theme='darkGray' style={{ width: "100px", position: "absolute", right: "20px" }}>삭제</Button>
              </WishContentWrapper>
            )) : ''}
          </Grid>
        </Container>
      </WishWrapper>
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

const WishWrapper = styled.div`
  width: 70%;
  margin-bottom: 20px;
`

const WishTitle = styled.p`
  font-size: 20px;
  font-weight: 500;
`

const TextView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;

const WishContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: row;
  height: 150px;
  border: 1px solid #ededed;
  border-radius: 2px;
  padding: 13px 14px;
  align-items: center;
  position: relative;

  img {
    width: 85px;
    height: 85px;
    object-fit: cover;
  }
`

const WishInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  justify-content: center;
`

const WishProduct = styled.div`
  font-size: 18px;
  font-weight: 400;
`

const WishPrice = styled.div`
  font-size: 20px;
  font-weight: 600;
`