import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRegister } from '@/api/hooks/auth';
import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import { Footer } from '@/components/features/Layout/Footer';
import { Header } from '@/components/features/Layout/Header';
import { breakpoints } from '@/styles/variants';

export const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { mutate: register } = useRegister();

  const handleSignup = () => {
    if (!email || !password || !confirmPassword || !name) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    register(
      { email, password, name },
      {
        onSuccess: () => {
          alert('회원가입이 완료되었습니다.');
          navigate('/login');
        },
        onError: () => {
          alert('회원가입에 실패했습니다.');
        },
      },
    );
  };

  return (
    <Wrapper>
      <Header />
      <Content>
        <Logo src={KAKAO_LOGO} alt="카카고 CI" />
        <FormWrapper>
          <UnderlineTextField
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Spacing />
          <UnderlineTextField
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Spacing />
          <UnderlineTextField
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Spacing />
          <UnderlineTextField
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Spacing height={{ initial: 40, sm: 60 }} />
          <Button onClick={handleSignup}>회원가입</Button>
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
  padding: 16px;
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
