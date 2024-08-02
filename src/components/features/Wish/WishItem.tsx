import styled from '@emotion/styled';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import { Image } from '@/components/common/Image';
import { useHandleWish } from '@/hooks/useHandleWish';

type Props = {
  productId: number;
  name: string;
  imageURL: string;
  price: number;
};

export const WishItem = ({ productId, name, imageURL, price }: Props) => {
  const { isWish, handleWishClick } = useHandleWish();
  const navigate = useNavigate();

  const handleWishItemClick = () => {
    navigate(`/products/${productId}`);
  };

  return (
    <Wrapper onClick={handleWishItemClick}>
      <Image src={imageURL} width={85} />
      <GoodsInfo>
        <GoodsInfoText>{name}</GoodsInfoText>
        <GoodsInfoText>
          <strong>{price}</strong>원
        </GoodsInfoText>
      </GoodsInfo>
      <WishButton onClick={() => handleWishClick(productId)}>
        {isWish ? (
          <AiFillHeart style={{ color: 'rgb(241, 42, 36)', fontSize: '24px' }} />
        ) : (
          <AiOutlineHeart style={{ color: '#000', fontSize: '24px' }} />
        )}
      </WishButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: start;
  overflow: hidden;
  padding: 13px 14px;
  border: 1px solid #ededed;
  border-radius: 2px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0 1px 2px -1px rgba(0, 0, 0, 0.06);
`;

const GoodsInfo = styled.div`
  margin-left: 12px;
  overflow: hidden;
`;

const WishButton = styled.button`
  position: absolute;
  right: 14px;
  top: 13px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const GoodsInfoText = styled.p`
  display: block;
  overflow: hidden;
  padding-top: 1px;
  font-size: 15px;
  color: #222;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: break-word;
  letter-spacing: -0.013em;
`;
