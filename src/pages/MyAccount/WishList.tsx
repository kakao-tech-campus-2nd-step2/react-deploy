import styled from '@emotion/styled';

import { useGetWishList } from '@/api/hooks/useGetWishList';
import { LoadingView } from '@/components/common/View/LoadingView';
import type { ProductData } from '@/types';

import { WishItem } from './WishItem';

export const WishList = () => {
  const { data, isLoading, error } = useGetWishList();

  if (isLoading) {
    return <LoadingView />;
  }
  if (error) {
    console.log(error);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return <div>{error.response.data.message}</div>;
  }

  return (
    <Wrapper>
      {data?.map((wish: ProductData) => (
        <WishItem
          key={wish.id}
          wishId={wish.id}
          imageUrl={wish.imageUrl}
          name={wish.name}
          price={wish.price}
        />
      ))}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
