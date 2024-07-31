import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useValidateEmail } from '@/hooks/useValidateEmail';
import { RouterPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import { authSessionStorage } from '@/utils/storage';

export const SignUpPage = () => {
  const { email, isEmailValid, handleEmailChange } = useValidateEmail();
  const [password, setPassword] = useState('');
  const [queryParams] = useSearchParams();

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate(RouterPath.home);
  };

  const handleConfirm = async () => {
    if (!email || !password) {
      alert('회원 정보를 모두 입력해주세요.');
      return;
    } else if (!isEmailValid) {
      alert('이메일을 바르게 입력해주세요.');
      return;
    }

    try {
      // TODO: 실제 회원가입 API 호출

      // 임시 회원가입 처리
      authSessionStorage.set(email);

      const redirectUrl = queryParams.get('redirect') ?? RouterPath.home;
      navigate(redirectUrl);
    } catch (error) {
      console.error('failed to sign up:', error);
      alert('회원가입을 다시 시도해주세요.');
    }
  };

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카오 CI" onClick={handleLogoClick} />
      <FormWrapper>
        <UnderlineTextField
          type="email"
          placeholder="이메일"
          value={email}
          onChange={handleEmailChange}
        />
        {!isEmailValid && <ErrorText>이메일 형식으로 입력해주세요.</ErrorText>}
        <Spacing />
        <UnderlineTextField
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Spacing
          height={{
            initial: 40,
            sm: 60,
          }}
        />
        <Button onClick={handleConfirm}>회원가입</Button>
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

const ErrorText = styled.p`
  color: #7d7d7d;
  font-size: 12px;
  margin-top: 5px;
`;
