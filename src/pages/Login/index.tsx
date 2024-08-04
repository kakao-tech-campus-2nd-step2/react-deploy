import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLogin } from '@/api/hooks/auth';
import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import { Footer } from '@/components/features/Layout/Footer'; // Footer import
import { Header } from '@/components/features/Layout/Header'; // Header import
import { breakpoints } from '@/styles/variants';
import { authSessionStorage } from '@/utils/storage';

type LoginResponse = {
  accessToken: string;
  // 필요한 경우 다른 필드도 추가
};

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { mutate: login } = useLogin();

  const handleLogin = () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    login(
      { email, password },
      {
        onSuccess: (data: LoginResponse) => {
          authSessionStorage.set(data.accessToken);
          alert('로그인 성공');
          window.location.replace(`${window.location.origin}/`);
        },
        onError: () => {
          alert('이메일 또는 비밀번호가 잘못되었습니다.');
        },
      },
    );
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <Wrapper>
      <Header />
      <Content>
        <Logo src={KAKAO_LOGO} alt="카카고 CI" />
        <FormWrapper>
          <UnderlineTextField
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Spacing />
          <UnderlineTextField
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Spacing height={{ initial: 40, sm: 60 }} />
          <Button onClick={handleLogin}>로그인</Button>
          <Spacing height={20} />
          <Button theme="outline" onClick={handleSignup}>
            회원가입
          </Button>
        </FormWrapper>
      </Content>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
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
