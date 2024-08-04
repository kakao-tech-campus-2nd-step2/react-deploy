import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDeleteWish } from '@/api/hooks/wish/useDeleteWish';
import { usePostWish } from '@/api/hooks/wish/usePostWish';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

export const useHandleWish = () => {
  const [isWish, setIsWish] = useState(false);
  const navigate = useNavigate();
  const postMutation = usePostWish();
  const deleteMutation = useDeleteWish();

  const token = authSessionStorage.get();

  const handleWishClick = (id: number) => {
    // 위시 등록 안 되어 있으면
    if (!isWish) {
      if (!token) {
        if (confirm('로그인이 필요한 메뉴입니다.\n로그인하시겠습니까?')) {
          navigate(RouterPath.login);
        } else {
          return; // 사용자가 로그인하지 않기로 선택한 경우, API 요청 미전송
        }
      }
      // 위시 등록 api 요청
      postMutation.mutate(
        { productId: id },
        {
          onSuccess: () => {
            alert('위시에 담았어요!');
            setIsWish(true);
          },
          onError: (error) => {
            if (error.message !== '로그인 필요') {
              alert('위시 등록 실패. 다시 시도하세요.');
            }
          },
        },
      );
    } else {
      // 위시 등록 되어있으면
      deleteMutation.mutate(
        { wishId: id },
        {
          onSuccess: () => {
            setIsWish(false);
          },
          onError: () => {
            alert('위시 삭제 실패. 다시 시도하세요.');
          },
        },
      );
    }
  };

  return { isWish, handleWishClick };
};
