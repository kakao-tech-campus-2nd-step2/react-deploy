import styled from '@emotion/styled';

import { useGetWishes } from '@/api/hooks/useGetWishes';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

export const MyAccountPage = () => {
  const authInfo = useAuth();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useGetWishes({ initPage: 0 });

  const handleLogout = () => {
    authSessionStorage.set(undefined);

    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error?.message || 'Failed to load wishlist'}</p>;

  const wishes = data?.pages.flatMap((page) => page.wishes) || [];

  return (
    <Wrapper>
      {authInfo?.id ? (
        <>
          <p>{authInfo.id}님 안녕하세요!</p>
          <Spacing height={64} />
          <Button
            size="small"
            theme="darkGray"
            onClick={handleLogout}
            style={{ maxWidth: '200px' }}
          >
            로그아웃
          </Button>
          <Spacing height={64} />
          <WishlistContainer>
            <h2>관심 목록</h2>
            {wishes.length > 0 ? (
              <ul>
                {wishes.map((item) => (
                  <li key={item.id}>
                    <InterestProduct>
                      <img src={item.image_url} alt={item.product_name} width={70} />
                      <div>
                        <p>이름: {item.product_name}</p>
                        <p>가격: {item.product_price}</p>
                      </div>
                      <Button size="small" theme="darkGray" style={{ maxWidth: '100px' }}>
                        삭제
                      </Button>
                    </InterestProduct>
                  </li>
                ))}
                {hasNextPage && (
                  <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                    {isFetchingNextPage ? 'Loading more...' : 'Load More'}
                  </Button>
                )}
              </ul>
            ) : (
              <p>관심 목록이 비어있습니다.</p>
            )}
          </WishlistContainer>
        </>
      ) : (
        <p>로그인 정보를 찾을 수 없습니다.</p>
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

const WishlistContainer = styled.div`
  width: 100%;
  max-width: 600px;
  text-align: center;

  h2 {
    font-size: 24px;
    margin-bottom: 16px;
  }

  ul {
    list-style-type: none;
    padding: 0;

    li {
      font-size: 18px;
      margin-bottom: 8px;
    }
  }
`;
const InterestProduct = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  gap: 4px;
  div {
    text-align: left;
  }
`;
