import styled from '@emotion/styled';

import { useGetWishes } from '@/api/hooks/wish/useGetWishes';
import { HEADER_HEIGHT } from '@/components/features/Layout/Header';
import { useAuth } from '@/provider/Auth';
import { breakpoints } from '@/styles/variants';

import { WishItem } from './WishItem';

const PAGE = 0;
const SIZE = 10;
const SORT = 'createdDate,desc';

export const Wish = () => {
  const authInfo = useAuth();

  const {
    data: wishList,
    isLoading,
    isError,
    error,
  } = useGetWishes({
    page: PAGE,
    size: SIZE,
    sort: SORT,
  });

  return (
    <Wrapper>
      <HeadingText>
        {authInfo?.email}님의
        <br />
        위시리스트
      </HeadingText>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error?.message}</p>}
      <WishList>
        {wishList?.map((item) => (
          <WishItem
            key={item.productId}
            productId={item.productId}
            name={item.name}
            price={item.price}
            imageUrl={item.imageUrl}
            wishId={item.wishId}
          />
        ))}
      </WishList>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  width: 100%;
  min-height: calc(100vh - ${HEADER_HEIGHT});
  padding: 16px 16px 60px;
  border-left: 1px solid #ededed;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 0 0 60px 28px;
  }
`;

const HeadingText = styled.h3`
  padding: 40px 0 30px;
  font-size: 28px;
  line-height: 38px;
  font-weight: bold;
  white-space: pre-line;
`;

const WishList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;
