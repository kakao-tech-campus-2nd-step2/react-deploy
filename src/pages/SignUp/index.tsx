import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useRegister } from '@/api/hooks/members/useMembers';
import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useValidateEmail } from '@/hooks/useValidateEmail';
import { RouterPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

export const SignUpPage = () => {
  const { email, isEmailValid, handleEmailChange } = useValidateEmail();
  const [password, setPassword] = useState('');
  const [queryParams] = useSearchParams();
  const mutation = useRegister();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    if (!email || !password) {
      alert('회원 정보를 모두 입력해주세요.');
      return;
    } else if (!isEmailValid) {
      alert('이메일을 바르게 입력해주세요.');
      return;
    }

    mutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          alert('회원가입되었습니다.');

          const redirectUrl = queryParams.get('redirect') ?? RouterPath.home;
          navigate(redirectUrl);
        },
        onError: (error) => {
          console.error('failed to sign up:', error);
          alert('회원가입을 다시 시도해주세요.');
        },
      },
    );
  };

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카오 CI" onClick={() => navigate(RouterPath.home)} />
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
        <Spacing height={26} />
        <LinkButton onClick={() => navigate(RouterPath.login)}>이미 계정이 있어요</LinkButton>
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
  cursor: pointer;
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

const LinkButton = styled.p`
  float: left;
  font-size: 12px;
  color: #191919;
  cursor: pointer;
`;

const ErrorText = styled.p`
  color: #e65f3e;
  font-size: 11px;
  letter-spacing: -0.05em;
  margin-top: 8px;
`;
