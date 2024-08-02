import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BASE_URL } from '@/api/instance';
import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import { breakpoints } from '@/styles/variants';
import { authSessionStorage } from '@/utils/storage';

export const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      console.log('회원가입 요청:', { email, password });

      const response = await fetch(`${BASE_URL}/api/members/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '회원가입 실패!');
      }

      const data = await response.json();
      authSessionStorage.set(data.token); //회원가입 성공하면 토큰저장
      alert('회원가입이 완료되었습니다.');
      navigate('/');
    } catch (error) {
      //console.error('회원가입 오류:', error);
      alert('회원가입 실패 - 체크');
    }
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
        <Spacing height={{ initial: 40, sm: 60 }} />
        <Button onClick={handleSignUp}>회원가입</Button>
        <RegButton onClick={() => navigate('/login')}> 로그인 페이지로 이동</RegButton>
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

const RegButton = styled(Button)`
  background-color: rgb(235, 235, 235);
  margin-top: 20px;
  &:hover {
    color: #fff;
  }
`;
