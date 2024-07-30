import styled from '@emotion/styled';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import { breakpoints } from '@/styles/variants';
import { authSessionStorage } from '@/utils/storage';

export const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [queryParams] = useSearchParams();

  const handleConfirm = () => {
    if (!id || !password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    // TODO: API 연동

    // TODO: API 연동 전까지 임시 로그인 처리
    authSessionStorage.set(id);

    const redirectUrl = queryParams.get('redirect') ?? `${window.location.origin}/`;
    return window.location.replace(redirectUrl);
  };

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카고 CI" />
      <FormWrapper>
        <UnderlineTextField placeholder="카카오메일 아이디, 이메일, 전화번호" value={id} onChange={(e) => setId(e.target.value)} />
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
        <OrBox>
          <OrText>또는</OrText>
        </OrBox>
        <Button theme='lightGray' onClick={handleConfirm}>이메일로 로그인</Button>
        <SignUp>
          <SignUpA href='/register'>회원가입</SignUpA>
        </SignUp>
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

const OrBox = styled.span`
  position: relative;
  display: block;
  width: 100%;
  padding: 15px 0;
  font-size: 0;
  line-height: 0;
  text-align: center;

  &::before,
  &::after {
    content: "";
    display: inline-block;
    width: calc(50% - 30px);
    height: 1px;
    margin: 8px 0;
    background-color: rgba(0, 0, 0, 0.06);
    vertical-align: top;
  }

  &::before {
    margin-right: 10px;
  }

  &::after {
    margin-left: 10px;
  }
`;

const OrText = styled.span`
  display: inline-block;
  width: 40px;
  font-size: 12px;
  line-height: 18px;
  color: #828282;
  vertical-align: middle;
`

const SignUp = styled.div`
  margin-top: 15px;
`

const SignUpA = styled.a`
`