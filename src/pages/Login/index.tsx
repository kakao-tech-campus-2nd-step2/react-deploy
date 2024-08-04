import { Box, Img, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import Symbol from '@/assets/kakao_symbol.svg';
import { breakpoints } from '@/styles/variants';

export const LoginPage = () => {
  const handleKakaoLogin = () => {
    window.location.href = '/oauth/kakao/login';
  };

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카오 CI" />
      <FormWrapper>
        <KakaoLoginButton onClick={handleKakaoLogin}>
          <StyledImg src={Symbol} alt="Kakao Symbol" />
          <LoginText>카카오 로그인</LoginText>
        </KakaoLoginButton>
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

const KakaoLoginButton = styled(Box)`
  display: flex;
  background-color: #fee500;
  width: 100%;
  height: 2.5rem;
  border-radius: 5px;
  text-align: center;
  align-items: center;
  justify-content: start;
  cursor: pointer;
`;

const LoginText = styled(Text)`
  display: flex;
  text-align: center;
  margin-left: 1rem;
`;

const StyledImg = styled(Img)`
  width: 1.5rem;
  text-align: center;
  margin-right: 2rem;
  margin-left: 1rem;
`;
