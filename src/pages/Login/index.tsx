import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { breakpoints } from '@/styles/variants';
import { authSessionStorage } from '@/utils/storage';
import { BASE_URL } from '@/api/instance';

export const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.body.textContent?.trim(); // 토큰 가져오기
    console.log('Token:', token); // 디버깅용
    // const urlParams = new URLSearchParams(window.location.search);
    // const token = urlParams.get('token'); // 디버깅용
    if (token) {
      console.log('sb');
      authSessionStorage.set({ token }); // 토큰 저장
      navigate('/'); // 홈으로 리다이렉트
      window.location.reload();
    } else {
      console.log('No token found');
    }
  }, [navigate]);
  
  const handleKakaoLogin = () => {
    // 카카오 로그인 페이지로 리다이렉트
    window.location.href = `${BASE_URL}/kakao/login`;
  };

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카오 CI" />
      <FormWrapper>
        <Button onClick={handleKakaoLogin}>카카오 로그인입니다</Button>
        <Spacing height={20} />
      </FormWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.img`
  width: 88px;
  color: #333;
`;

const FormWrapper = styled.article`
  width: 100%;
  max-width: 580px;
  padding: 16px;

  @media screen and (min-width: ${breakpoints.sm}) {
    border: 1px solid rgba(0, 0, 0, 0.12);
    padding: 60px 52px;
  }
`;
