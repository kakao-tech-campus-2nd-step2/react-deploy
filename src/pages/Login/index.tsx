import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { login } from '@/api/hooks/useGetUser';
import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useAPIBaseURL } from '@/provider/APIBaseURL';
import { RouterPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [queryParams] = useSearchParams();
  const baseURL = useAPIBaseURL()[0];

  const handleConfirm = () => {
    if (!email || !password) {
      alert('이메일와 비밀번호를 입력해주세요.');
      return;
    }

    login(email, password, baseURL).then((result) => {
      if (result) {
        const redirectUrl = queryParams.get('redirect') ?? `${window.location.origin}/`;
        return window.location.replace(redirectUrl);
      } else {
        alert('이메일와 비밀번호를 확인해주세요.');
        return;
      }
    });
  };

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카고 CI" />
      <FormWrapper>
        <UnderlineTextField
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

        <Spacing
          height={{
            initial: 40,
            sm: 60,
          }}
        />
        <Button onClick={handleConfirm}>로그인</Button>
        <Spacing />
        <Button onClick={() => navigate(RouterPath.signUp)} theme="lightGray" size="small">
          회원가입하기
        </Button>
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
