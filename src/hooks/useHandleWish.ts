import { useState } from 'react';

import { usePostWish } from '@/api/hooks/wish/usePostWish';

export const useHandleWish = () => {
  const [isWish, setIsWish] = useState(false);
  const mutation = usePostWish();

  const handleWishClick = (productId: number) => {
    if (!isWish) {
      // 위시 등록 api 요청
      mutation.mutate(
        { productId: productId },
        {
          onSuccess: () => {
            alert('위시에 담았어요!');
            setIsWish(true);
          },
          onError: () => {
            alert('위시 등록 실패. 다시 시도하세요.');
          },
        },
      );
    } else {
      // 위시 삭제 api 요청
      alert('취소! 위시에서 삭제할게요.');
      setIsWish(false);
    }
  };

  return {
    isWish,
    handleWishClick,
  };
};
